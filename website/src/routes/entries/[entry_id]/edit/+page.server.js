import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { entries, entriesToCategories } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

// TODO(vxern): Validate.

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const result = await db.transaction(async (tx) => {
      await db.update(entries).set({
        name: data.get("name"),
        source_id: data.get("source_id"),
      }).where(eq(entries.id, Number(data.get("id"))));

      // TODO(vxern): Make this work.
      const entriesToCategories = await db.select().from(entriesToCategories)
        .where(eq(entriesToCategories.entry_id, Number(data.get("id"))));
    })

    // TODO(vxern): Handle failure.

    redirect(303, `/sources`);
  },
};