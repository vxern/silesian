import { db, findMany } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, eq, sql } from 'drizzle-orm';

export const load = async () => ({
  entries: await getDraftEntries()
});

function getDraftEntries() {
  return findMany(entries, {
    where: (entries, { like, eq, and }) => and(
      eq(entries.status, "draft"),
      eq(entries.deleted, false),
      // TODO(vxern): Filter by the author. (need to go through versions)
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