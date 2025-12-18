import { db } from "$lib/database.server";
import { authors, authorsToLocations, locations, versions } from "$lib/database/schema";
import { and, eq, ne, count } from 'drizzle-orm';

export const load = async () => {
  return {
    draftCount: getDraftCount(),
    pendingCount: getPendingCount(),
    authors: await getPublishedAuthors(),
  };
};

function getDraftCount() {
  return db
    .select({ count: count() })
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
    .then((results) => results.at(0).count);
}

function getPendingCount() {
  return db
    .select({ count: count() })
    .from(authors)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 1),
        eq(authors.deleted, false),
        eq(authors.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPublishedAuthors() {
  return db
    .select({ authors, locations })
    .from(authors)
    .withVersions()
    .where(
      and(
        eq(authors.deleted, false),
        eq(authors.status, "published"),
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