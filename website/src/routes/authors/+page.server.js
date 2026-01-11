import { db } from "$lib/database.server";
import { authors, authorsToLocations, locations, versions } from "$lib/database/schema";
import { and, eq, ne, count } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return {
    draftCount: getDraftCount(locals.session),
    pendingCount: getPendingCount(locals.session),
    authors: await getPublishedAuthors(),
  };
};

function getDraftCount(session) {
  return db
    .select({ count: count() })
    .from(authors)
    .withVersions()
    .where(
      and(
        eq(versions.author_id, session.user.id),
        eq(authors.deleted, false),
        eq(authors.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPendingCount(session) {
  return db
    .select({ count: count() })
    .from(authors)
    .withVersions()
    .where(
      and(
        ne(versions.author_id, session.user.id),
        eq(authors.deleted, false),
        eq(authors.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPublishedAuthors() {
  return db.query.authors.findMany({
    where: {
      status: "published",
      deleted: false,
    },
    with: {
      locations: true,
    },
  });
}