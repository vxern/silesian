import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return {
    entries: await db.select().from(entries).where(eq(entries.status, "pending")),
  };
};