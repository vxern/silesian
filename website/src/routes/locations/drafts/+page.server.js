import { redirect } from "@sveltejs/kit";
import { db, versionedDelete } from "$lib/database.server";
import { locations, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { locations: await getDraftLocations() };
};

/** Performs 1 query. */
function getDraftLocations() {
  return db
    .select({ locations })
    .from(locations)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 2),
        eq(locations.deleted, false),
        eq(locations.status, "draft"),
      ),
    )
    .then((results) => results.map((result) => result.locations));
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    
    // TODO(vxern): Validate access.

    const location = await versionedDelete({
      table: locations,
      id: data.get("id"),
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 2,
    });

    // TODO(vxern): Show toast.
    redirect(303, "/locations/drafts");
  },
};
