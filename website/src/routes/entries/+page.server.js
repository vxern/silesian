import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    draftCount: db.select({ count: count() }).from(entries).where(eq(entries.status, "draft")).then((results) => results.at(0).count),
    pendingCount: db.select({ count: count() }).from(entries).where(eq(entries.status, "pending")).then((results) => results.at(0).count),
    entries: await db.select().from(entries).where(eq(entries.status, "published")),
  };
};