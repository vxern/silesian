import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { categories } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

// TODO(vxern): Need to exclude deleted objects from filters.

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return {
    category: await db.query.categories.findFirst({ where: (categories, { eq }) => eq(categories.id, params.category_id) } ),
  };
};

// TODO(vxern): Validate.

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    // TODO(vxern): This is the wrong code.
    const category = await db.transaction(async (tx) => {
      const category = await db.update(categories).set({
        name: data.get("name"),
        description: data.get("description"),
        colour: data.get("colour"),
      }).where(eq(categories.id, Number(data.get("id")))).returning({ status: categories.status }).then((result) => result.at(0));

      await db.insert(versions).values({
        versionable_type: "categories",
        versionable_id: category.id,
      }).onConflictDoUpdate({
        target: versions.version,
        set: { version: sql`versions.version + 1` },
      });

      return category;
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

    redirect(303, redirectTo);
  },
};