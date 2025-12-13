import { db } from "$lib/database.server";
import { sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { sources: await getPendingSources() };
};

/** Performs 1 query. */
function getPendingSources() {
  return db
    .select({ sources, authors })
    .from(sources)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 1),
        eq(sources.deleted, false),
        eq(sources.status, "pending"),
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
