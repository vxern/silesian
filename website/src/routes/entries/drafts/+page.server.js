import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    entries: await db.select().from(entries).where(eq(entries.status, "draft")),
  };
};