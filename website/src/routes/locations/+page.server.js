import { db } from "$lib/database.server";
import { locations, versions } from "$lib/database/schema";
import { and, ne, eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    draftCount: getDraftCount(),
    pendingCount: getPendingCount(),
    locations: await getPublishedLocations(),
  };
};

function getDraftCount() {
  return db
    .select({ count: count() })
    .from(locations)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 1),
        eq(locations.deleted, false),
        eq(locations.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPendingCount() {
  return db
    .select({ count: count() })
    .from(locations)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 1),
        eq(locations.deleted, false),
        eq(locations.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPublishedLocations() {
  return db
    .select()
    .from(locations)
    .withVersions()
    .where(
      and(
        eq(locations.deleted, false),
        eq(locations.status, "published"),
      ),
    );
}