import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    draftCount: db.select({ count: count() }).from(sources).where(eq(sources.status, "draft")).then((results) => results.at(0).count),
    pendingCount: db.select({ count: count() }).from(sources).where(eq(sources.status, "pending")).then((results) => results.at(0).count),
    sources: await db.select().from(sources).where(eq(sources.status, "published")),
  };
};