import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    sources: await db.select().from(sources).where(eq(sources.status, "draft")),
  };
};