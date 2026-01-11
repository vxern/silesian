import { db } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, authorsToSources, authors, authorsToEntries, versions } from "$lib/database/schema";
import { and, eq, ne, count } from 'drizzle-orm';
import { alias } from "drizzle-orm/pg-core";

export const load = async ({ locals }) => {
  return {
    draftCount: getDraftCount(locals.session),
    pendingCount: getPendingCount(locals.session),
    entries: await getPublishedEntries(),
  };
};

function getDraftCount(session) {
  return db
    .select({ count: count() })
    .from(entries)
    .withVersions()
    .where(
      and(
        eq(versions.author_id, session.user.id),
        eq(entries.deleted, false),
        eq(entries.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPendingCount(session) {
  return db
    .select({ count: count() })
    .from(entries)
    .withVersions()
    .where(
      and(
        ne(versions.author_id, session.user.id),
        eq(entries.deleted, false),
        eq(entries.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPublishedEntries() {
  return db.query.entries.findMany({
    where: {
      status: "published",
      deleted: false,
    },
    with: {
      source: {
        with: {
          authors: {
            with: {
              locations: true,
            }
          }
        },
      },
      categories: true,
    },
  });
}