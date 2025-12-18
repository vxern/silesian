import { findMany } from "$lib/database.server";
import { entries, entriesToCategories, categories, authorsToSources, authorsToLocations, locations, authors, sources, entriesInsertSchema, idsSchema } from "$lib/database/schema";
import { sql, and, eq, like, asc, desc, inArray } from "drizzle-orm";

export const load = async ({ params }) => {
  // TODO(vxern): Filter the status as well.
  return {
    entries: await getEntries({ lemma: params.lemma }),
  };
};

function getEntries({ lemma }) {
  const similarity = sql`levenshtein(${entries.lemma}, ${lemma})`.as('similarity');

  return findMany(entries, {
    where: (entries, { like, eq, and }) => and(
      // TODO(vxern): IMPORTANT - This needs to be a lot smarter.
      like(entries.lemma, `%${lemma}%`),
      // TODO(vxern): Re-enable.
      // inArray(entries.status, ["pending", "published"]),
      eq(entries.deleted, false)
    ),
    extras: { similarity },
    orderBy: (entries, { asc }) => [asc(similarity), desc(sql`LENGTH(${entries.contents})`)],
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
