import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { versions, reviews } from "$lib/database/schema";
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

    const version = await db.query.versions.findFirst({
      where: (versions, { eq }) => and(
        eq(versions.versionable_id, data.get("id")),
        eq(versions.versionable_type, "entries"),
      ),
      orderBy: [desc(versions.version)],
    });
    if (!version) {
      // TODO(vxern): Handle failure.
      return;
    }

    // TODO(vxern): Implement comments.
    // const comments = JSON.parse(data.get("comments[]"));
    // if (comments.length === 0) {
    //   return null;
    // }

    const review = await db.insert(reviews).values({
      version_id: version.id,
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