import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { versions, reviews } from "$lib/database/schema";
import { eq, and, desc } from 'drizzle-orm';

// TODO(vxern): Need to exclude deleted objects from filters.

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return {
    source: await db.query.sources.findFirst({ where: (sources, { eq }) => eq(sources.id, params.source_id) }),
  };
};

// TODO(vxern): Validate.

export const actions = {
  review: async ({ request, locals }) => {
    const data = await request.formData();

    const version = await db.query.versions.findFirst({
      where: (versions, { eq }) => and(
        eq(versions.versionable_id, data.get("id")),
        eq(versions.versionable_type, "sources"),
      ),
      orderBy: [desc(versions.version)],
    });
    if (!version) {
      // TODO(vxern): Handle failure.
      return;
    }

    const review = await db.insert(reviews).values({
      version_id: version.id,
      // TODO(vxern): Update to the right user.
      reviewer_id: 1,
      decision: "reject" in data ? "rejected" : "accepted",
      comment: data.get("comment"),
    });

    // TODO(vxern): Handle failure.

    redirect(303, "/sources/review");
  },
};