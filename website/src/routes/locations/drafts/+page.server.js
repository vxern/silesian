import { redirect } from "@sveltejs/kit";
import { db, versionedDelete } from "$lib/database.server";
import { locations, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return { locations: await getDraftLocations(locals.session) };
};

function getDraftLocations(session) {
  return db.query.locations.findMany({
    where: {
      status: "draft",
      deleted: false,
      version: {
        author_id: session.user.id,
      },
    },
  });
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    
    // TODO(vxern): Validate access.

    const location = await versionedDelete({
      table: locations,
      id: data.get("id"),
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 1,
    });

    // TODO(vxern): Show toast.
    redirect(303, "/locations/drafts");
  },
};
