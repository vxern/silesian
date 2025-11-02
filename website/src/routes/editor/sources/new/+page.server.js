import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";

// TODO(vxern): Validate.

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const result = await db.insert(sources).values({
      name: data.get("name"),
      link: data.get("link"),
      isbn: data.get("isbn"),
      authors: data.get("authors"),
      licence_id: data.get("licence_id"),
      access: data.get("access"),
      redistributable: data.get("redistributable"),
      total_count: data.get("total_count"),
    });

    // TODO(vxern): Handle failure.

    redirect(303, `/editor/entry/${result}`);
  },
};