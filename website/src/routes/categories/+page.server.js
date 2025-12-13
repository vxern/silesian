import { db } from "$lib/database.server";
import { categories, versions } from "$lib/database/schema";
import { and, ne, eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    draftCount: getDraftCount(),
    pendingCount: getPendingCount(),
    categories: await getPublishedCategories(),
  };
};

/** Performs 1 query. */
function getDraftCount() {
  return db
    .select({ count: count() })
    .from(categories)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 1),
        eq(categories.deleted, false),
        eq(categories.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPendingCount() {
  return db
    .select({ count: count() })
    .from(categories)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 1),
        eq(categories.deleted, false),
        eq(categories.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

/** Performs 1 query. */
function getPublishedCategories() {
  return db
    .select()
    .from(categories)
    .withVersions()
    .where(
      and(
        eq(categories.deleted, false),
        eq(categories.status, "published"),
      ),
    );
}