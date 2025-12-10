import { db } from "$lib/database.server";
import { authors, versions } from "$lib/database/schema";
import { and, eq, ne, count } from 'drizzle-orm';

export const load = async () => {
  return {
    draftCount: getDraftCount(),
    pendingCount: getPendingCount(),
    authors: await getPublishedAuthors(),
  };
};

/** Performs 1 query. */
function getDraftCount() {
  return db
    .select({ count: count() })
    .from(authors)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 2),
        eq(authors.deleted, false),
        eq(authors.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPendingCount() {
  return db
    .select({ count: count() })
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
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPublishedAuthors() {
  return db
    .select()
    .from(authors)
    .withVersions()
    .where(
      and(
        eq(authors.deleted, false),
        eq(authors.status, "published"),
      ),
    )
    .then(
      (results) => results.map(
        (result) => {
          const author = result.authors;

          author.version = result.versions;

          return author;
        },
      ),
    );
}