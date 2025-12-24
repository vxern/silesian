import { db } from "$lib/database.server";
import { users, versions } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const load = async (params) => ({
  entries: await getBookmarkedEntries(),
});

function getBookmarkedEntries() {
  return db.query.entries.findMany({
    where: {
      bookmarks: {
        // TODO(vxern): Filter by the right user.
        user_id: 1,
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
