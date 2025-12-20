import { db } from "$lib/database.server";
import { authors, authorsToLocations, locations, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { authors: await getPendingAuthors() };
};

function getPendingAuthors() {
  return db.query.authors.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        // TODO(vxern): Update this later.
        author_id: { ne: 1 },
      },
    },
    with: {
      locations: true,
    },
  });
}
