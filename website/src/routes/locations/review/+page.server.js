import { db } from "$lib/database.server";
import { locations, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { locations: await getPendingLocations() };
};

/** Performs 1 query. */
function getPendingLocations() {
  return db
    .select({ locations })
    .from(locations)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 2),
        eq(locations.deleted, false),
        eq(locations.status, "pending"),
      ),
    )
    .then((results) => results.map((result) => result.locations));
}
