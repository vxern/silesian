import { db } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, eq, ne, count } from 'drizzle-orm';

export const load = async () => {
  return {
    draftCount: getDraftCount(),
    pendingCount: getPendingCount(),
    entries: await getPublishedEntries(),
  };
};

/** Performs 1 query. */
function getDraftCount() {
  return db
    .select({ count: count() })
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
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPendingCount() {
  return db
    .select({ count: count() })
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
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPublishedEntries() {
  return db
    .select({ entries, sources, categories })
    .from(entries)
    .withVersions()
    .where(
      and(
        eq(entries.deleted, false),
        eq(entries.status, "published"),
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