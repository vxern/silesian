import { db } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { entries: await getDraftEntries() };
};

/** Performs 1 query. */
function getDraftEntries() {
  return db
    .select({ entries, sources, authors, categories })
    .from(entries)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 1),
        eq(entries.deleted, false),
        eq(entries.status, "draft"),
      ),
    )
    .innerJoin(sources, eq(sources.id, entries.source_id))
    .leftJoin(authorsToSources, eq(authorsToSources.source_id, sources.id))
    .leftJoin(authors, eq(authors.id, authorsToSources.author_id))
    .leftJoin(entriesToCategories, eq(entriesToCategories.entry_id, entries.id))
    .leftJoin(categories, eq(categories.id, entriesToCategories.category_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ entries }) => entries.id)).map(
        (results) => {
          const entry = results[0].entries;

          entry.categories = results.map((result) => result.categories).filter((category) => category);

          entry.source = results[0].sources;

          entry.source.authors = results.map((result) => result.authors).filter((authors) => authors);

          return entry;
        }
      ),
    );
}
