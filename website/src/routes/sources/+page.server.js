import { db } from "$lib/database.server";
import { sources, versions, authorsToSources, authors } from "$lib/database/schema";
import { and, ne, eq, count } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return {
    draftCount: getDraftCount(locals.session),
    pendingCount: getPendingCount(locals.session),
    sources: await getPublishedSources(),
  };
};

function getDraftCount(session) {
  return db
    .select({ count: count() })
    .from(sources)
    .withVersions()
    .where(
      and(
        eq(versions.author_id, session.user.id),
        eq(sources.deleted, false),
        eq(sources.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPendingCount(session) {
  return db
    .select({ count: count() })
    .from(sources)
    .withVersions()
    .where(
      and(
        ne(versions.author_id, session.user.id),
        eq(sources.deleted, false),
        eq(sources.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPublishedSources() {
  return db.query.sources.findMany({
    where: {
      status: "published",
      deleted: false,
    },
    with: {
      authors: true,
    },
  });
}