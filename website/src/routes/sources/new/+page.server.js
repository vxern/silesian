import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sources, versions } from "$lib/database/schema";
import { sql } from 'drizzle-orm';

export const actions = {
  create: async ({ request, locals }) => {
    // TODO(vxern): Kick the user out if they haven't got permission.
    // TODO(vxern): Validate.

    const data = await request.formData();

    const source = await db.transaction(async (tx) => {
      const source = await db.insert(sources).values({
        status: "draft" in data ? "draft" : "pending",
        name: data.get("name"),
        url: data.get("url"),
        authors: JSON.parse(data.get("authors[]")),
        year: data.get("year"),
        orthography: data.get("orthography"),
        source_language: data.get("source_language"),
        target_language: data.get("target_language"),
        licence: data.get("licence"),
        access: data.get("access"),
        redistributable: data.get("redistributable") === "1",
        total_entry_count: data.get("total_entry_count"),
      }).returning({ id: sources.id }).then((result) => result.at(0));

      await db.insert(versions).values({
        versionable_type: "sources",
        versionable_id: source.id,
      }).onConflictDoUpdate({
        target: versions.version,
        set: { version: sql`versions.version + 1` },
      });

      return source;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (source.status === "draft") {
      redirectTo = "/sources/drafts";
    } else if (source.status === "pending") {
      redirectTo = "/sources/review";
    } else if (source.status === "published") {
      redirectTo = "/sources";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, "/sources");
  },
};