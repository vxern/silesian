import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    draftCount: db.$count(sources, eq(sources.status, "draft")),
    pendingCount: db.$count(sources, eq(sources.status, "pending")),
    sources: await db.query.sources.findMany({
      where: (sources, { eq }) => eq(sources.status, "published"),
      with: {
        authors: {
          with: {
            author: true
          },
        },
      },
    }),
  };
};