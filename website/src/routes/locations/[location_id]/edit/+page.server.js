import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { locations } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return {
    location: await db.query.locations.findFirst({ where: (locations, { eq }) => eq(locations.id, params.location_id) }),
  };
};

// TODO(vxern): Validate.

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const location = await db.transaction(async (tx) => {
      const location = await db.update(locations).set({
        status: "draft" in data ? "draft" : "pending",
        name: data.get("name"),
      }).where(eq(locations.id, Number(data.get("id")))).returning({ status: locations.status }).then((result) => result.at(0));

      // TODO(vxern): Ensure versions have the same created_at as the main record's updated_at
      await db.insert(versions).values({
        versionable_type: "locations",
        versionable_id: location.id,
      }).onConflictDoUpdate({
        target: versions.version,
        set: { version: sql`versions.version + 1` },
      });

      return location;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (location.status === "draft") {
      redirectTo = "/locations/drafts";
    } else if (location.status === "pending") {
      redirectTo = "/locations/review";
    } else if (location.status === "published") {
      redirectTo = "/locations";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};