import { db } from "$lib/database.server";
import { categories } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    draftCount: db.$count(categories, eq(categories.status, "draft")),
    pendingCount: db.$count(categories, eq(categories.status, "pending")),
    categories: await db.query.categories.findMany({ where: (categories, { eq }) => eq(categories.status, "published") }),
  };
};