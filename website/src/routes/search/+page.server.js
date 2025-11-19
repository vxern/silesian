import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { searches, searchFrequencies } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): IMPORTANT - Filter by the correct user.
    // TODO(vxern): Limit
    searchHistory: await db.select().from(searches).where(eq(searches.searcher_id, 1)).orderBy(searches.created_at),
    popularSearches: await db.select().from(searchFrequencies).orderBy(searchFrequencies.count),
  };
};
