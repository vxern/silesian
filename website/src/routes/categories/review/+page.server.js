import { db } from "$lib/database.server";
import { categories, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { categories: await getPendingCategories() };
};

function getPendingCategories() {
  return db
    .select({ categories })
    .from(categories)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        ne(versions.author_id, 1),
        eq(categories.deleted, false),
        eq(categories.status, "pending"),
      ),
    )
    .then((results) => results.map((result) => result.categories));
}
