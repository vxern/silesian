import { redirect } from "@sveltejs/kit";
import { db, versionedInsert } from "$lib/database.server";
import { locations, locationsInsertSchema } from "$lib/database/schema";
import { eq, sql } from 'drizzle-orm';

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const locationData = locationsInsertSchema.parse({
      status: data.get("draft") === "" ? "draft" : "pending",
      name: data.get("name"),
    });

    const location = await versionedInsert({
      table: locations,
      values: locationData,
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 2,
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

    // TODO(vxern): Show toast.
    redirect(303, redirectTo);
  },
};