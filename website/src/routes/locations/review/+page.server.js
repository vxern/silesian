import { db } from "$lib/database.server";

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return {
    locations: await db.query.locations.findMany({ where: (locations, { eq }) => eq(locations.status, "pending") }),
  };
};