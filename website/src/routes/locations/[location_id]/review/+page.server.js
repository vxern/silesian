import { redirect } from "@sveltejs/kit";
import { db, insertReview } from "$lib/database.server";
import { locations, versions, reviews } from "$lib/database/schema";
import { eq, and, desc, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { location: await getLocation({ id: params.location_id }) };
};

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
  review: async ({ request, locals }) => {
    const data = await request.formData();

    const reviewData = reviewsInsertSchema.parse({
      // TODO(vxern): Update to the right user.
      reviewer_id: 2,
      decision: data.has("reject") ? "rejected" : "accepted",
      comment: data.get("comment"),
    });
    
    await insertReview({
      table: locations,
      id: Number(data.get("id")),
      values: reviewData,
    });

    // TODO(vxern): Handle failure.

    redirect(303, "/locations/review");
  },
};