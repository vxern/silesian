import { db } from "$lib/database.server";
import { categories } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return {
    categories: await db.select().from(categories).where(eq(categories.status, "draft")),
  };
};