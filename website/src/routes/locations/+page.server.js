import { db } from "$lib/database.server";
import { locations, versions } from "$lib/database/schema";
import { and, eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    draftCount: getDraftCount(),
    pendingCount: getPendingCount(),
    locations: await getPublishedLocations(),
  };
};

/** Performs 1 query. */
function getDraftCount() {
  return db
    .select({ count: count() })
    .from(locations)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 2),
        eq(locations.deleted, false),
        eq(locations.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPendingCount() {
  return db
    .select({ count: count() })
    .from(locations)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 2),
        eq(locations.deleted, false),
        eq(locations.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPublishedLocations() {
  return db
    .select()
    .from(locations)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 2),
        eq(locations.deleted, false),
        eq(locations.status, "published"),
      ),
    )
    .then(
      (results) => results.map(
        (result) => {
          const location = result.locations;

          location.version = result.versions;

          return location;
        },
      ),
    );
}