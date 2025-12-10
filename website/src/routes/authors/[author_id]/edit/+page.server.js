import { redirect } from "@sveltejs/kit";
import { db, versionedUpdate, versionedJoin } from "$lib/database.server";
import { authors, authorsToLocations, locations, authorsInsertSchema, idsSchema } from "$lib/database/schema";
import { eq, and, sql } from 'drizzle-orm';

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
      (results) => Object.values(Object.groupBy(results, ({ id }) => id)).map(
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
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const authorData = authorsInsertSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      name: data.get("name"),
    });

    const locationIds = idsSchema.parse(JSON.parse(data.get("location_ids[]")));

    const author = await db.transaction(async (tx) => {
      const author = await versionedUpdate({
        table: authors,
        id: Number(data.get("id")),
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 2,
        values: authorData,
        returning: { status: authors.status },
      });

      await versionedJoin({
        table: authorsToLocations,
        source: author,
        sourceColumnName: "author_id",
        existingIds: await db
          .select({ id: authorsToLocations.location_id })
          .from(authorsToLocations)
          .where(eq(authorsToLocations.author_id, author.id))
          .then((results) => results.map((result) => result.id)),
        targetIds: locationIds,
        targetColumnName: "location_id",
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 2,
      });

      return author;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (author.status === "draft") {
      redirectTo = "/authors/drafts";
    } else if (author.status === "pending") {
      redirectTo = "/authors/review";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};