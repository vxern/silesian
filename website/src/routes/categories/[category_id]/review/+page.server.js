import { redirect } from "@sveltejs/kit";
import { db, insertReview } from "$lib/database.server";
import { categories, versions, reviews } from "$lib/database/schema";
import { eq, and, desc, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { category: await getCategory({ id: params.category_id }) };
};

function getCategory({ id }) {
  return db.select()
    .from(categories)
    .where(
      and(
        eq(categories.id, id),
        eq(categories.deleted, false),
        eq(categories.status, "pending"),
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
      table: categories,
      id: Number(data.get("id")),
      values: reviewData,
    });

    // TODO(vxern): Handle failure.

    redirect(303, "/categories/review");
  },
};