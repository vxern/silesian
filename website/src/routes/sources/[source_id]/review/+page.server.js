import { redirect } from "@sveltejs/kit";
import { db, insertReview } from "$lib/database.server";
import { sources, versions, reviews } from "$lib/database/schema";
import { eq, and, desc, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { source: await getSource({ id: params.source_id }) };
};

/** Performs 1 query. */
function getSource({ id }) {
  return db
    .select({ sources, authors })
    .from(sources)
    .where(
      and(
        eq(sources.id, id),
        eq(sources.deleted, false),
        eq(sources.status, "pending"),
      ),
    )
    .leftJoin(authorsToSources, eq(authorsToSources.source_id, sources.id))
    .leftJoin(authors, eq(authors.id, authorsToSources.author_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ sources }) => sources.id)).map(
        (results) => {
          const source = results[0].sources;

          source.authors = results.map((result) => result.authors).filter((author) => author);

          return source;
        }
      ).at(0),
    );
}

// TODO(vxern): Validate.

export const actions = {
  /** Performs 1 query. */
  review: async ({ request, locals }) => {
    const data = await request.formData();

    const reviewData = reviewsInsertSchema.parse({
      // TODO(vxern): Update to the right user.
      reviewer_id: 2,
      decision: data.has("reject") ? "rejected" : "accepted",
      comment: data.get("comment"),
    });
    
    await insertReview({
      table: sources,
      id: Number(data.get("id")),
      values: reviewData,
    });

    // TODO(vxern): Handle failure.

    redirect(303, "/sources/review");
  },
};