import { redirect } from "@sveltejs/kit";
import { db, versionedInsert, versionedJoin } from "$lib/database.server";
import { entries, entriesToCategories, categories, entriesInsertSchema, idsSchema } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

// TODO(vxern): Validate.

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    // TODO(vxern): IMPORTANT - Validate the source.

    const entryData = entriesInsertSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      lemma: data.get("lemma"),
      contents: data.get("contents"),
      source_id: data.get("source_id") ? Number(data.get("source_id")) : null,
    });

    const categoryIds = idsSchema.parse(JSON.parse(data.get("category_ids[]")));

    const entry = await db.transaction(async (tx) => {
      const entry = await versionedInsert({
        table: entries,
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 1,
        values: entryData,
        returning: { lemma: entries.lemma, source_id: entries.source_id },
      });

      await versionedJoin({
        table: entriesToCategories,
        source: entry,
        sourceColumnName: "entry_id",
        targetIds: categoryIds,
        targetColumnName: "category_id",
        existingIds: [],
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 1,
      });

      return entry;
    });

    // TODO(vxern): Handle failure.

    if (data.has("make_more")) {
      return { source_id: entry.source_id };
    }
    
    redirect(303, `/lemma/${encodeURIComponent(entry.lemma)}#${entry.id}`);
  },
};
