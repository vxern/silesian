import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    draftCount: db.$count(entries, eq(entries.status, "draft")),
    pendingCount: db.$count(entries, eq(entries.status, "pending")),
    entries: await db.query.entries.findMany({
      where: (entries, { eq }) => eq(entries.status, "published"),
      with: {
        source: true,
        categories: {
          with: {
            category: true,
          },
        },
      },
    }),
  };
};