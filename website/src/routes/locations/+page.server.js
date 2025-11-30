import { db } from "$lib/database.server";
import { locations } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    draftCount: db.$count(locations, eq(locations.status, "draft")),
    pendingCount: db.$count(locations, eq(locations.status, "pending")),
    locations: await db.query.locations.findMany({ where: (locations, { eq }) => eq(locations.status, "published") }),
  };
};