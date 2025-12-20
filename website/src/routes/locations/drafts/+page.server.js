import { redirect } from "@sveltejs/kit";
import { db, versionedDelete } from "$lib/database.server";
import { locations, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { locations: await getDraftLocations() };
};

function getDraftLocations() {
  return db.query.locations.findMany({
    where: {
      status: "draft",
      deleted: false,
      version: {
        // TODO(vxern): Set the right author.
        author_id: 1,
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
