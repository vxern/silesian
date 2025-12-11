import { db } from "$lib/database.server";
import { sources, versions, authorsToSources, authors } from "$lib/database/schema";
import { and, ne, eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    draftCount: getDraftCount(),
    pendingCount: getPendingCount(),
    sources: await getPublishedSources(),
  };
};

/** Performs 1 query. */
function getDraftCount() {
  return db
    .select({ count: count() })
    .from(sources)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 2),
        eq(sources.deleted, false),
        eq(sources.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPendingCount() {
  return db
    .select({ count: count() })
    .from(sources)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 2),
        eq(sources.deleted, false),
        eq(sources.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPublishedSources() {
  return db
    .select({ sources, authors })
    .from(sources)
    .withVersions()
    .where(
      and(
        eq(sources.deleted, false),
        eq(sources.status, "published"),
      ),
    )
    .leftJoin(authorsToSources, eq(authorsToSources.source_id, sources.id))
    .leftJoin(authors, eq(authors.id, authorsToSources.author_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ sources }) => sources.id)).map(
        (results) => {
          const source = results[0].sources;

          source.authors = results.map((result) => result.authors).filter((author) => author);

          return source;
        }
      ),
    );
}