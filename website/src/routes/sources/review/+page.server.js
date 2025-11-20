import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return {
    sources: await db.select().from(sources).where(eq(sources.status, "pending")),
  };
};