import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { changes, reviews } from "$lib/database/schema";
import { eq, and, desc } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return {
    entry: await db.query.entries.findFirst({
      where: (entries, { eq }) => eq(entries.id, params.entry_id),
    }),
  };
};

// TODO(vxern): Validate.

export const actions = {
  review: async ({ request, locals }) => {
    const data = await request.formData();

    const change = await db.query.changes.findFirst({
      where: (changes, { eq }) => and(
        eq(changes.changeable_id, data.get("id")),
        eq(changes.changeable_type, "entries"),
      ),
      orderBy: [desc(changes.version)],
    });
    if (!change) {
      // TODO(vxern): Handle failure.
      return;
    }

    // TODO(vxern): Implement comments.
    // const comments = JSON.parse(data.get("comments[]"));
    // if (comments.length === 0) {
    //   return null;
    // }

    const review = await db.insert(reviews).values({
      change_id: change.id,
      // TODO(vxern): Update to the right user.
      reviewer_id: 1,
      decision: "reject" in data ? "rejected" : "accepted",
    // TODO(vxern): Implement comments.
      comments: [],
    });

    // TODO(vxern): Handle failure.

    redirect(303, "/entries/review");
  },
};