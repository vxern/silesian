import { redirect } from "@sveltejs/kit";
import { db, versionedDelete } from "$lib/database.server";
import { categories, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return { categories: await getDraftCategories(locals.session) };
};

function getDraftCategories(session) {
  return db.query.categories.findMany({
    where: {
      status: "draft",
      deleted: false,
      version: {
        author_id: session.user.id,
      },
    },
  });
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    
    // TODO(vxern): Validate access.

    const category = await versionedDelete({
      table: categories,
      id: data.get("id"),
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 1,
    });

    // TODO(vxern): Show toast.
    redirect(303, "/categories/drafts");
  },
};
