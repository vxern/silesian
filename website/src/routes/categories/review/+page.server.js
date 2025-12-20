import { db } from "$lib/database.server";
import { categories, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { categories: await getPendingCategories() };
};

function getPendingCategories() {
  return db.query.categories.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        // TODO(vxern): Set the right author.
        author_id: { ne: 1 },
      },
    },
  });
}
