import { db } from "$lib/database.server";
import { categories } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    draftCount: db.select({ count: count() }).from(categories).where(eq(categories.status, "draft")).then((results) => results.at(0).count),
    pendingCount: db.select({ count: count() }).from(categories).where(eq(categories.status, "pending")).then((results) => results.at(0).count),
    categories: await db.select().from(categories).where(eq(categories.status, "published")),
  };
};