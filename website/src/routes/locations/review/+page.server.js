import { db } from "$lib/database.server";
import { locations, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { locations: await getPendingLocations() };
};

function getPendingLocations() {
  return db.query.locations.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        // TODO(vxern): Set the right author.
        author_id: { ne: 1 },
      },
    },
  });
}
