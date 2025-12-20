import { db } from "$lib/database.server";
import { entries, entriesToCategories, categories, authorsToSources, authorsToLocations, locations, authors, sources, entriesInsertSchema, idsSchema } from "$lib/database/schema";
import { sql, and, eq, like, asc, desc, inArray } from "drizzle-orm";

export const load = async ({ params }) => {
  // TODO(vxern): Filter the status as well.
  return {
    entries: await getEntries({ lemma: params.lemma }),
  };
};

function getEntries({ lemma }) {
  return db.query.entries.findMany({
    where: {
      lemma: { like: `%${lemma}%` },
      // TODO(vxern): Re-enable.
      // status: { inArray: ["pending", "published"] },
      deleted: false,
    },
    extras: {
      similarity: (entries, { sql }) => sql`levenshtein(${entries.lemma}, ${lemma})`,
    },
    orderBy: (entries) => sql`"similarity" ASC, LENGTH(${entries.contents}) DESC`,
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
  return findMany(entries, {
    where: (entries, { like, eq, and }) => and(
      // TODO(vxern): IMPORTANT - This needs to be a lot smarter.
      like(entries.lemma, `%${lemma}%`),
      eq(entries.deleted, false)
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
