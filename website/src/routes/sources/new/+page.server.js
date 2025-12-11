import { redirect } from "@sveltejs/kit";
import { db, versionedInsert, versionedJoin } from "$lib/database.server";
import { sources, authorsToSources, sources, sourcesInsertSchema, idsSchema } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

// TODO(vxern): Validate.

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const sourceData = sourcesInsertSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      name: data.get("name"),
      description: data.get("description") || null,
      url: data.get("url") || null,
      year: data.get("year") || null,
      orthography: data.get("orthography"),
      source_language: data.get("source_language"),
      target_language: data.get("target_language"),
      licence: data.get("licence"),
      access: data.get("access"),
      redistributable: data.get("redistributable") === "1",
      total_entry_count: data.get("total_entry_count") ? Number(data.get("total_entry_count")) : null,
    });

    const authorIds = idsSchema.parse(JSON.parse(data.get("author_ids[]")));

    const source = await db.transaction(async (tx) => {
      const source = await versionedInsert({
        table: sources,
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 2,
        values: sourceData,
        returning: { status: sources.status },
      });

      await versionedJoin({
        table: authorsToSources,
        source: source,
        sourceColumnName: "source_id",
        targetIds: authorIds,
        targetColumnName: "author_id",
        existingIds: [],
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 2,
      });

      return source;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (source.status === "draft") {
      redirectTo = "/sources/drafts";
    } else if (source.status === "pending") {
      redirectTo = "/sources/review";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};
