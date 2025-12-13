import { redirect } from "@sveltejs/kit";
import { db, versionedUpdate, versionedJoin } from "$lib/database.server";
import { locations, locationsUpdateSchema } from "$lib/database/schema";
import { eq, and, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { location: await getLocation({ id: params.location_id }) };
};

/** Performs 1 query. */
function getLocation({ id }) {
  return db.select()
    .from(locations)
    .where(
      and(
        eq(locations.id, id),
        eq(locations.deleted, false),
        eq(locations.status, "draft"),
      ),
    )
    .limit(1)
    .then((results) => results.at(0));
}

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const locationData = locationsUpdateSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      name: data.get("name"), 
      description: data.get("description") || null,
      country: data.get("country"),
    });

    const location = await versionedUpdate({
      table: locations,
      id: Number(data.get("id")),
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 1,
      values: locationData,
      returning: { status: locations.status },
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (location.status === "draft") {
      redirectTo = "/locations/drafts";
    } else if (location.status === "pending") {
      redirectTo = "/locations/review";
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};