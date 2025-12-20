import { db, findMany } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { entries: await getPendingEntries() };
};

function getPendingEntries() {
  return db.query.entries.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        // TODO(vxern): Update this later.
        author_id: 1,
      },
    },
    with: {
      source: {
        with: {
          authors: {
            with: {
              locations: true
            },
          },
        },
      },
      categories: true,
    },
  });
}
