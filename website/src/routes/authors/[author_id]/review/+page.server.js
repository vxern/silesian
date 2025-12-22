import { redirect } from "@sveltejs/kit";
import { db, insertReview } from "$lib/database.server";
import { authors, versions, reviews } from "$lib/database/schema";
import { eq, and, desc } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { author: await getAuthor({ id: params.author_id }) };
};

function getAuthor({ id }) {
  return db.query.authors.findFirst({
    where: {
      id,
      status: "pending",
      deleted: false,
      version: {
        // TODO(vxern): Update this later.
        author_id: { ne: 1 },
      },
    },
    with: {
      locations: true,
    },
  });
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
      table: authors,
      id: Number(data.get("id")),
      values: reviewData,
    });

    // TODO(vxern): Handle failure.

    redirect(303, `/authors/review#${author.id}`);
  },
};