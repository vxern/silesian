import { db, findMany } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return { entries: await getPendingEntries(locals.session) };
};

function getPendingEntries(session) {
  return db.query.entries.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        author_id: { ne: session.user.id },
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
