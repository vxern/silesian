import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";

// TODO(vxern): Validate.

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const result = await db.insert(entries).values({
      lemma: data.get("lemma"),
      source_id: data.get("source_id"),
      licence_id: data.get("licence_id"),
      orthography_id: data.get("orthography_id"),
      contents: data.get("contents"),
      source_language: data.get("source_language"),
      target_language: data.get("target_language"),
      status: "draft" in data ? "draft" : "pending",
    });

    // TODO(vxern): Handle failure.

    redirect(303, `/editor/entry/${result}`);
  },
};