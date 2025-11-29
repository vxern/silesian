import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return {
    source: await db.query.sources.findFirst({ where: (sources, { eq }) => eq(sources.id, params.source_id) }),
  };
};

// TODO(vxern): Validate.

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const source = await db.transaction(async (tx) => {
      const source = await db.update(sources).set({
        status: "draft" in data ? "draft" : "pending",
        name: data.get("name"),
        description: data.get("description"),
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
      }).where(eq(sources.id, Number(data.get("id")))).returning({ status: sources.status }).then((result) => result.at(0));

      // TODO(vxern): Ensure versions have the same created_at as the main record's updated_at
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

    redirect(303, redirectTo);
  },
};