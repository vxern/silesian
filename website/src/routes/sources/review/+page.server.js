import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    sources: await db.select().from(sources).where(eq(sources.status, "pending")),
  };
};