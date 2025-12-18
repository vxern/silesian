import { db } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, authorsToSources, authors, authorsToEntries, versions } from "$lib/database/schema";
import { and, eq, ne, count } from 'drizzle-orm';
import { alias } from "drizzle-orm/pg-core";

export const load = async () => {
  return {
    draftCount: getDraftCount(),
    pendingCount: getPendingCount(),
    entries: await getPublishedEntries(),
  };
};

function getDraftCount() {
  return db
    .select({ count: count() })
    .from(entries)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 1),
        eq(entries.deleted, false),
        eq(entries.status, "draft"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPendingCount() {
  return db
    .select({ count: count() })
    .from(entries)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 1),
        eq(entries.deleted, false),
        eq(entries.status, "pending"),
      ),
    )
    .then((results) => results.at(0).count);
}

function getPublishedEntries() {
  return findMany(entries, {
    where: (entries, { like, eq, and }) => and(
      eq(entries.status, "published"),
      eq(entries.deleted, false),
    ),
    with: {
      source: {
        with: {
          authors: {
            with: {
              author: {
                with: {
                  locations: {
                    with: {
                      location: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      categories: {
        with: {
          category: true,
        },
      },
    },
  });
}