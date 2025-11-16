import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the entry.
    entry: await db.select().from(entries).where(eq(entries.id, 1)).then((entries) => entries.at(0)),
  };
};

// TODO(vxern): Validate.

export const actions = {
  review: async ({ request, locals }) => {
    const data = await request.formData();

    const entry = await db.transaction(async (tx) => {
      return;

      await db.insert(reviews).values({
      });

      return entry;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (entry.status === "draft") {
      redirectTo = "/entries/drafts";
    } else if (entry.status === "pending") {
      redirectTo = "/entries/review";
    } else if (entry.status === "published") {
      redirectTo = "/entries";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};