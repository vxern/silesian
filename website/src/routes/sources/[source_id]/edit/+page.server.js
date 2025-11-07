import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

// TODO(vxern): Validate.

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const result = await db.update(sources).set({
      name: data.get("name"),
      link: data.get("link"),
      authors: JSON.parse(data.get("authors[]")),
      orthography: data.get("orthography"),
      source_language: data.get("source_language"),
      target_language: data.get("target_language"),
      licence: data.get("licence"),
      access: data.get("access"),
      redistributable: data.get("redistributable") === "1",
      total_entry_count: data.get("total_entry_count"),
    }).where(eq(sources.id, Number(data.get("id"))));

    // TODO(vxern): Handle failure.

    redirect(303, `/sources`);
  },
};