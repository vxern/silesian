import { redirect } from "@sveltejs/kit";
import { db, versionedUpdate, versionedJoin } from "$lib/database.server";
import { categories, categoriesUpdateSchema } from "$lib/database/schema";
import { eq, and, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { category: await getCategory({ id: params.category_id }) };
};

function getCategory({ id }) {
  return db.query.categories.findFirst({
    where: {
      id,
      status: "draft",
      deleted: false,
      version: {
        // TODO(vxern): Set the right author.
        author_id: 1,
      },
    },
  });
}

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const categoryData = categoriesUpdateSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      name: data.get("name"),
      description: data.get("description") || null,
      colour: data.get("colour"),
    });

    const category = await versionedUpdate({
      table: categories,
      id: Number(data.get("id")),
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 1,
      values: categoryData,
      returning: { status: categories.status },
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (category.status === "draft") {
      redirectTo = `/categories/drafts#${category.id}`;
    } else if (category.status === "pending") {
      redirectTo = `/categories/review#${category.id}`;
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};