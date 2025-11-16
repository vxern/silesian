import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { categories } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

// TODO(vxern): Need to exclude deleted objects from filters.

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the category.
    category: await db.select().from(categories).where(eq(categories.id, 1)).then((categories) => categories.at(0)),
  };
};

// TODO(vxern): Validate.

export const actions = {
  review: async ({ request, locals }) => {
    const data = await request.formData();

    const source = await db.transaction(async (tx) => {
      return;

      await db.insert(reviews).values({
      });

      return source;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (source.status === "draft") {
      redirectTo = "/sources/drafts";
    } else if (source.status === "pending") {
      redirectTo = "/sources/review";
    } else if (source.status === "published") {
      redirectTo = "/sources";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};