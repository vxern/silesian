import { redirect } from "@sveltejs/kit";
import { db, versionedInsert, versionedJoin, insertAttachment } from "$lib/database.server";
import { authors, authorsToLocations, locations, authorsInsertSchema, idsSchema } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

// TODO(vxern): Validate.

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const authorData = authorsInsertSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      name: data.get("name"),
      years: data.get("years") || null,
      description: data.get("description") || null,
    });

    const locationIds = idsSchema.parse(JSON.parse(data.get("location_ids[]")));

    const author = await db.transaction(async (tx) => {
      const author = await versionedInsert({
        table: authors,
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 1,
        values: authorData,
        returning: { status: authors.status },
      });

      await versionedJoin({
        table: authorsToLocations,
        source: author,
        sourceColumnName: "author_id",
        targetIds: locationIds,
        targetColumnName: "location_id",
        existingIds: [],
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 1,
      });

      await insertAttachment({
        table: authors,
        id: author.id,
        name: "image",
        file: data.get("image"),
      })

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