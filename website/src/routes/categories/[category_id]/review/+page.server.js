import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

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