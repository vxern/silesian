import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return {
    source: await db.select().from(sources).where(eq(sources.id, params.source_id)).then((sources) => sources.at(0)),
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