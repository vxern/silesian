import { redirect } from "@sveltejs/kit";
import { db, versionedDelete } from "$lib/database.server";
import { categories, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { categories: await getDraftCategories() };
};

/** Performs 1 query. */
function getDraftCategories() {
  return db
    .select({ categories })
    .from(categories)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 1),
        eq(categories.deleted, false),
        eq(categories.status, "draft"),
      ),
    )
    .then((results) => results.map((result) => result.categories));
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    
    // TODO(vxern): Validate access.

    const category = await versionedDelete({
      table: categories,
      id: data.get("id"),
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 2,
    });

    // TODO(vxern): Show toast.
    redirect(303, "/categories/drafts");
  },
};
