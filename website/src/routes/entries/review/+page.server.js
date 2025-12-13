import { db } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { entries: await getPendingEntries() };
};

/** Performs 1 query. */
function getPendingEntries() {
  return db
    .select({ entries, sources, categories })
    .from(entries)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 1),
        eq(entries.deleted, false),
        eq(entries.status, "pending"),
      ),
    )
    .innerJoin(sources, eq(sources.id, entries.source_id))
    .leftJoin(entriesToCategories, eq(entriesToCategories.entry_id, entries.id))
    .leftJoin(categories, eq(categories.id, entriesToCategories.category_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ entries }) => entries.id)).map(
        (results) => {
          const entry = results[0].entries;

          entry.source = results[0].sources;
          entry.categories = results.map((result) => result.categories).filter((category) => category);

          return entry;
        }
      ),
    );
}
