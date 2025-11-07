import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";

// TODO(vxern): Validate.

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const result = await db.insert(sources).values({
      name: data.get("name"),
      url: data.get("url"),
      authors: JSON.parse(data.get("authors[]")),
      orthography: data.get("orthography"),
      source_language: data.get("source_language"),
      target_language: data.get("target_language"),
      licence: data.get("licence"),
      access: data.get("access"),
      redistributable: data.get("redistributable") === "1",
      total_entry_count: data.get("total_entry_count"),
    });

    console.log(result);

    // TODO(vxern): Handle failure.

    redirect(303, "/sources");
  },
};