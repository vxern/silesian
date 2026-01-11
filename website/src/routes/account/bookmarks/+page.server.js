import { db } from "$lib/database.server";
import { users, versions } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const load = async ({ locals }) => ({
  entries: await getBookmarkedEntries(locals.session),
});

function getBookmarkedEntries(session) {
  return db.query.entries.findMany({
    where: {
      bookmarks: {
        user_id: session.user.id,
      },
      deleted: false,
    },
    with: {
      bookmarks: true,
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
