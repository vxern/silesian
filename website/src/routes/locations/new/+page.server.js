import { redirect } from "@sveltejs/kit";
import { db, versionedInsert } from "$lib/database.server";
import { locations, locationsInsertSchema } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    const locationData = locationsInsertSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      name: data.get("name"),
      description: data.get("description") || null,
      country: data.get("country"),
    });

    const location = await versionedInsert({
      table: locations,
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

    // TODO(vxern): Show toast.
    redirect(303, redirectTo);
  },
};