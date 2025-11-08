import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";

// TODO(vxern): Validate.

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const entry = await db.transaction(async (tx) => {
      const entry = await db.insert(entries).values({
        lemma: data.get("lemma"),
        contents: data.get("contents"),
        source_id: data.get("source_id"),
        status: "draft" in data ? "draft" : "pending",
      }).returning({ id: entries.id, lemma: entries.lemma }).then((result) => result.at(0));

      const categories = JSON.parse(data.get("categories[]"));
      if (categories.length === 0) {
        return entry;
      }

      const entriesToCategories = await db.insert(entries)
        .values(categories.map((category_id) => ({ entry_id: entry.id, category_id })));

      return entry;
    });

    // TODO(vxern): Handle failure.

    // TODO(vxern): Any better place?
    redirect(303, `/lemma/${entry.lemma}#${entry.id}`);
  },
};