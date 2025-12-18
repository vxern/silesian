import { db, findMany } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { entries: await getPendingEntries() };
};

function getPendingEntries() {
  return findMany(entries, {
    where: (entries, { like, eq, and }) => and(
      eq(entries.status, "pending"),
      eq(entries.deleted, false),
      // TODO(vxern): Filter out the author. (need to go through versions)
    ),
    with: {
      source: {
        with: {
          authors: {
            with: {
              author: {
                with: {
                  locations: {
                    with: {
                      location: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      categories: {
        with: {
          category: true,
        },
      },
    },
  });
}
