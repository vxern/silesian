import { db } from "$lib/database.server";
import { authors, authorsToLocations, locations, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { authors: await getPendingAuthors() };
};

/** Performs 1 query. */
function getPendingAuthors() {
  return db
    .select({ authors, locations })
    .from(authors)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 2),
        eq(authors.deleted, false),
        eq(authors.status, "pending"),
      ),
    )
    .leftJoin(authorsToLocations, eq(authorsToLocations.author_id, authors.id))
    .leftJoin(locations, eq(locations.id, authorsToLocations.location_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ id }) => id)).map(
        (results) => {
          const author = results[0].authors;

          author.locations = results.map((result) => result.locations).filter((location) => location);

          return author;
        }
      ),
    );
}
