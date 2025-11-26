import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { categories, versions } from "$lib/database/schema";
import { sql } from 'drizzle-orm';

export const actions = {
  create: async ({ request, locals }) => {
    // TODO(vxern): Kick the user out if they haven't got permission.
    // TODO(vxern): Validate.

    const data = await request.formData();

    const category = await db.transaction(async (tx) => {
      const category = await db.insert(categories).values({
        status: "draft" in data ? "draft" : "pending",
        name: data.get("name"),
        description: date.get("description"),
        colour: data.get("colour"),
      }).returning({ id: categories.id }).then((result) => result.at(0));

      // TODO(vxern): There can't be a conflict here.
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

    redirect(303, "/categories");
  },
};