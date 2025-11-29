import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { authors } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

// TODO(vxern): Validate.

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const author = await db.transaction(async (tx) => {
      const author = await db.update(authors).set({
        status: "draft" in data ? "draft" : "pending",
        name: data.get("name"),
        locations: JSON.parse(data.get("locations[]")),
      }).where(eq(authors.id, Number(data.get("id")))).returning({ status: authors.status }).then((result) => result.at(0));

      // TODO(vxern): Ensure versions have the same created_at as the main record's updated_at
      await db.insert(versions).values({
        versionable_type: "authors",
        versionable_id: author.id,
      }).onConflictDoUpdate({
        target: versions.version,
        set: { version: sql`versions.version + 1` },
      });

      return author;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (author.status === "draft") {
      redirectTo = "/authors/drafts";
    } else if (author.status === "pending") {
      redirectTo = "/authors/review";
    } else if (author.status === "published") {
      redirectTo = "/authors";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};