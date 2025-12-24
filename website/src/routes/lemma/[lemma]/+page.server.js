import { db } from "$lib/database.server";
import { entries, entriesToCategories, categories, authorsToSources, authorsToLocations, locations, authors, sources, entriesInsertSchema, idsSchema } from "$lib/database/schema";
import { sql, and, eq, like, asc, desc, inArray } from "drizzle-orm";
import { bookmarks } from "$lib/database/schema";

export const load = async ({ params }) => {
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
      bookmarks: {
        where: {
          // TODO(vxern): Update the user ID.
          user_id: 1,
        },
      },
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

export const actions = {
  bookmark: async ({ request }) => {
    const data = await request.formData();
    
    // TODO(vxern): Validate access.

    try {
      await db.insert(bookmarks).values({
        bookmarkable_type: "entries",
        bookmarkable_id: data.get("id"),
        // TODO(vxern): IMPORTANT - Update the user ID.
        user_id: 1,
      });
    } catch (error) {
      await db.delete(bookmarks).where(
        and(
          eq(bookmarks.bookmarkable_type, "entries"),
          eq(bookmarks.bookmarkable_id, data.get("id")),
          // TODO(vxern): IMPORTANT - Update the user ID.
          eq(bookmarks.user_id, 1),
        ),
      );
    }

    // TODO(vxern): What to do here?
  },
};
