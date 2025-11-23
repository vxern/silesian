import { db } from "$lib/database.server";

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return {
    sources: await db.query.sources.findMany({ where: (sources, { eq }) => eq(sources.status, "pending") }),
  };
};