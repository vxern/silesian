import { db } from "$lib/database.server";
import { categories } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return {
    categories: await db.query.categories.findMany({ where: (categories, { eq }) => eq(categories.status, "pending") } ),
  };
};