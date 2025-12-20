import { db } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, eq, sql } from 'drizzle-orm';

export const load = async () => ({
  entries: await getDraftEntries()
});

function getDraftEntries() {
  return db.query.entries.findMany({
    where: {
      status: "draft",
      deleted: false,
      version: {
        author_id: 1,
      },
    },
    with: {
      source: {
        with: {
          authors: {
            with: {
              locations: true
            },
          },
        },
      },
      categories: true,
    },
  });
}