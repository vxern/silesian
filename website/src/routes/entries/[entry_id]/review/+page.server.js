import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { versions, reviews } from "$lib/database/schema";
import { eq, and, desc } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { entry: await getEntry({ id: params.entry_id }) };
};

function getEntry({ id }) {
  return db.query.entries.findFirst({
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
      source: {
        with: {
          authors: {
            with: {
              locations: true
            },
          },
        },
      },
      categories: true,
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
      table: entries,
      id: Number(data.get("id")),
      values: reviewData,
    });

    // TODO(vxern): Handle failure.

    redirect(303, `/entries/review#${entry.id}`);
  },
};