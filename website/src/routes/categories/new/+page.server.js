import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { categories, changes } from "$lib/database/schema";

// TODO(vxern): Validate.

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const category = await db.transaction(async (tx) => {
      const category = await db.insert(categories).values({
        status: "draft" in data ? "draft" : "pending",
        name: data.get("name"),
        colour: data.get("colour"),
      }).returning({ id: categories.id }).then((result) => result.at(0));

      await db.insert(changes).values({
        changeable_type: "categories",
        changeable_id: source.id,
      }).onConflictDoUpdate({
        target: changes.version,
        set: { version: sql`changes.version + 1` },
      });

      return source;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (category.status === "draft") {
      redirectTo = "/categories/drafts";
    } else if (category.status === "pending") {
      redirectTo = "/categories/review";
    } else if (category.status === "published") {
      redirectTo = "/categories";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, "/categories");
  },
};