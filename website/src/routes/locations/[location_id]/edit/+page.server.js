import { redirect } from "@sveltejs/kit";
import { db, versionedUpdate } from "$lib/database.server";
import { locations, locationsUpdateSchema } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return {
    location: await db.query.locations.findFirst({ where: (locations, { eq }) => eq(locations.id, params.location_id) }),
  };
};

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const locationData = locationsUpdateSchema.parse({
      status: data.get("draft") === "" ? "draft" : "pending",
      name: data.get("name"),
    });

    const location = await versionedUpdate({
      table: locations,
      id: Number(data.get("id")),
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 2,
      values: locationData,
      returning: { status: locations.status },
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