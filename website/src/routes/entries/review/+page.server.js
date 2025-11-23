import { db } from "$lib/database.server";

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return {
    entries: await db.query.entries.findMany({
      where: (entries, { eq }) => eq(entries.status, "pending"),
      with: { source: true },
    }),
  };
};