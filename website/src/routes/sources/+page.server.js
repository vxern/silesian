import { db } from "$lib/database.server";
import { sources, versions, authorsToSources, authors } from "$lib/database/schema";
import { and, ne, eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    draftCount: getDraftCount(),
    pendingCount: getPendingCount(),
    sources: await getPublishedSources(),
  };
};

function getDraftCount() {
  return db
    .select({ count: count() })
    .from(sources)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 1),
        eq(sources.deleted, false),
        eq(sources.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPendingCount() {
  return db
    .select({ count: count() })
    .from(sources)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 1),
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