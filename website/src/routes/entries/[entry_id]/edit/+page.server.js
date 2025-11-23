import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { entries, entriesToCategories } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return {
    entry: await db.query.entries.findFirst({
      where: (entries, { eq }) => eq(entries.id, params.entry_id)
    }),
  };
};

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const result = await db.transaction(async (tx) => {
      await db.update(entries).set({
        name: data.get("name"),
        source_id: data.get("source_id"),
      }).where(eq(entries.id, Number(data.get("id"))));

      // TODO(vxern): Make this work.
      const entriesToCategories = await db.query.entriesToCategories.findFirst({
        where: (entriesToCategories, { eq }) => eq(entriesToCategories.entry_id, Number(data.get("id"))),
      });
    })

    // TODO(vxern): Handle failure.

    redirect(303, `/sources`);
  },
};