import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { categories } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

// TODO(vxern): Need to exclude deleted objects from filters.

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return {
    category: await db.select().from(categories).where(eq(categories.id, params.category_id)).then((categories) => categories.at(0)),
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
        link: data.get("link"),
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

      await db.insert(changes).values({
        changeable_type: "sources",
        changeable_id: source.id,
      }).onConflictDoUpdate({
        target: changes.version,
        set: { version: sql`changes.version + 1` },
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