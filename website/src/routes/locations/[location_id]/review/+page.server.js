import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { locations, versions, reviews } from "$lib/database/schema";
import { eq, and, desc, sql } from 'drizzle-orm';

/** Performs 1 query in total. */
export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { location: await getLocation({ id: params.location_id }) };
};

/** Performs 1 query. */
function getLocation({ id }) {
  return db.select()
    .from(locations)
    .where(
      and(
        eq(locations.id, id),
        eq(locations.deleted, false),
        eq(locations.status, "pending"),
      ),
    )
    .limit(1)
    .then((results) => results.at(0));
}

// TODO(vxern): Validate.

export const actions = {
  /** Performs 1 query. */
  review: async ({ request, locals }) => {
    const data = await request.formData();

    const reviewData = reviewsInsertSchema.parse({
      comment: data.get("comment"),
    });
    
    const review = await db.insert(reviews).values({
      version_id:
        sql`${
          db
          .select({ version_id: versions.id })
          .from(locations)
          .withVersions()
          .where(eq(locations.id, Number(data.get("id"))))
          .limit(1)
        }`,
      // TODO(vxern): Update to the right user.
      reviewer_id: 2,
      decision: "reject" in data ? "rejected" : "accepted",
      comment: reviewData.comment,
    });

    // TODO(vxern): Handle failure.

    redirect(303, "/locations/review");
  },
};