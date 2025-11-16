import { db } from "$lib/database.server";
import { users } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async (params) => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    user: await db.select().from(users).where(eq(users.id, 1)).then((users) => users.at(0)),
  };
};