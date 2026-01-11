import { db } from "$lib/database.server";
import { locations, versions } from "$lib/database/schema";
import { and, ne, eq, count } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return {
    draftCount: getDraftCount(locals.session),
    pendingCount: getPendingCount(locals.session),
    locations: await getPublishedLocations(),
  };
};

function getDraftCount(session) {
  return db
    .select({ count: count() })
    .from(locations)
    .withVersions()
    .where(
      and(
        eq(versions.author_id, session.user.id),
        eq(locations.deleted, false),
        eq(locations.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPendingCount(session) {
  return db
    .select({ count: count() })
    .from(locations)
    .withVersions()
    .where(
      and(right author.
        ne(versions.author_id, session.user.id),
        eq(locations.deleted, false),
        eq(locations.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPublishedLocations() {
  return db.query.locations.findMany({
    where: {
      status: "published",
      deleted: false,
    },
    with: {
      authors: true,
    },
  });
}