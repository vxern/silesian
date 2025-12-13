import { db } from "$lib/database.server";
import { authors, authorsToLocations, locations, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { authors: await getDraftAuthors() };
};

/** Performs 1 query. */
function getDraftAuthors() {
  return db
    .select({ authors, locations })
    .from(authors)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 1),
        eq(authors.deleted, false),
        eq(authors.status, "draft"),
      ),
    )
    .leftJoin(authorsToLocations, eq(authorsToLocations.author_id, authors.id))
    .leftJoin(locations, eq(locations.id, authorsToLocations.location_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ authors }) => authors.id)).map(
        (results) => {
          const author = results[0].authors;

          author.locations = results.map((result) => result.locations).filter((location) => location);

          return author;
        }
      ),
    );
}
