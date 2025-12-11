import { redirect } from "@sveltejs/kit";
import { db, insertReview } from "$lib/database.server";
import { authors, versions, reviews } from "$lib/database/schema";
import { eq, and, desc } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { author: await getAuthor({ id: params.author_id }) };
};

/** Performs 1 query. */
function getAuthor({ id }) {
  return db
    .select({ authors, locations })
    .from(authors)
    .where(
      and(
        eq(authors.id, id),
        eq(authors.deleted, false),
        eq(authors.status, "draft"),
      ),
    )
    .leftJoin(authorsToLocations, eq(authorsToLocations.author_id, authors.id))
    .leftJoin(locations, eq(locations.id, authorsToLocations.location_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ authors }) => authors.id)).map(
        (results) => {
          const author = results[0].authors;

          author.locations = results.map((result) => result.locations).filter((location) => location);

          return author;
        }
      ).at(0),
    );
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

    redirect(303, "/authors/review");
  },
};