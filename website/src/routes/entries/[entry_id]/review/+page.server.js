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
  return db
    .select({ entries, sources, categories })
    .from(entries)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 1),
        eq(entries.deleted, false),
        eq(entries.status, "pending"),
      ),
    )
    .innerJoin(sources, eq(sources.id, entries.source_id))
    .leftJoin(entriesToCategories, eq(entriesToCategories.entry_id, entries.id))
    .leftJoin(categories, eq(categories.id, entriesToCategories.category_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ entries }) => entries.id)).map(
        (results) => {
          const entry = results[0].entries;

          entry.source = results[0].sources;
          entry.categories = results.map((result) => result.categories).filter((category) => category);

          return entry;
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
      table: entries,
      id: Number(data.get("id")),
      values: reviewData,
    });

    // TODO(vxern): Handle failure.

    redirect(303, "/entries/review");
  },
};