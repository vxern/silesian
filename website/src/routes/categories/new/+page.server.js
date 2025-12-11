import { redirect } from "@sveltejs/kit";
import { db, versionedInsert } from "$lib/database.server";
import { categories, categoriesInsertSchema } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    const categoryData = categoriesInsertSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      name: data.get("name"),
      description: data.get("description") || null,
      colour: data.get("colour"),
    });

    const category = await versionedInsert({
      table: categories,
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 2,
      values: categoryData,
      returning: { status: categories.status },
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (category.status === "draft") {
      redirectTo = "/categories/drafts";
    } else if (category.status === "pending") {
      redirectTo = "/categories/review";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    // TODO(vxern): Show toast.
    redirect(303, redirectTo);
  },
};