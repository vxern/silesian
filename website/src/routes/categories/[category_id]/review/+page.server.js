import { redirect } from "@sveltejs/kit";
import { db, insertReview } from "$lib/database.server";
import { categories, versions, reviews } from "$lib/database/schema";
import { eq, and, desc, sql } from 'drizzle-orm';

export const load = async ({ locals, params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { category: await getCategory(locals.session, { id: params.category_id }) };
};

function getCategory(session, { id }) {
  return db.query.categories.findMany({
    where: {
      id,
      status: "pending",
      deleted: false,
      version: {
        author_id: session.user.id,
      },
    },
  });
}

// TODO(vxern): Validate.

export const actions = {
  review: async ({ request, locals }) => {
    const data = await request.formData();

    const reviewData = reviewsInsertSchema.parse({
      reviewer_id: locals.session.user.id,
      decision: data.has("reject") ? "rejected" : "accepted",
      comment: data.get("comment"),
    });
    
    await insertReview({
      table: categories,
      id: Number(data.get("id")),
      values: reviewData,
    });

    // TODO(vxern): Handle failure.

    redirect(303, `/categories/review#${category.id}`);
  },
};