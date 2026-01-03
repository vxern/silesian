import { redirect } from "@sveltejs/kit";
import { db, versionedUpdate, versionedJoin } from "$lib/database.server";
import { authors, authorsToLocations, locations, authorsInsertSchema, idsSchema } from "$lib/database/schema";
import { eq, and, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { author: await getAuthor({ id: params.author_id }) };
};

function getAuthor({ id }) {
  return db.query.authors.findFirst({
    where: {
      id,
      status: "draft",
      deleted: false,
      version: {
        // TODO(vxern): Update this later.
        author_id: 1,
      },
    },
    with: {
      locations: true,
    },
  });
}

// TODO(vxern): Validate.

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const authorData = authorsInsertSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      name: data.get("name"),
      years: data.get("years") || null,
      description: data.get("description") || null,
    });

    const locationIds = idsSchema.parse(JSON.parse(data.get("location_ids[]")));

    const author = await db.transaction(async (tx) => {
      const author = await versionedUpdate({
        table: authors,
        id: Number(data.get("id")),
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 1,
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
        authorId: 1,
      });

      return author;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (author.status === "draft") {
      redirectTo = `/authors/drafts#${author.id}`;
    } else if (author.status === "pending") {
      redirectTo = `/authors/review#${author.id}`;
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};