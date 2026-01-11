import { db } from "$lib/database.server";
import { categories, versions } from "$lib/database/schema";
import { and, ne, eq, count } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return {
    draftCount: getDraftCount(locals.session),
    pendingCount: getPendingCount(locals.session),
    categories: await getPublishedCategories(),
  };
};

function getDraftCount(session) {
  return db
    .select({ count: count() })
    .from(categories)
    .withVersions()
    .where(
      and(
        eq(versions.author_id, session.user.id),
        eq(categories.deleted, false),
        eq(categories.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPendingCount(session) {
  return db
    .select({ count: count() })
    .from(categories)
    .withVersions()
    .where(
      and(
        ne(versions.author_id, session.user.id),
        eq(categories.deleted, false),
        eq(categories.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPublishedCategories() {
  return db.query.categories.findMany({
    where: {
      status: "published",
      deleted: false,
    },
  });
}