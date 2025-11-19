import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { searches, searchFrequencies } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): IMPORTANT - Filter by the correct user.
  // TODO(vxern): Limit
  const [searchHistory, popularSearches] = await Promise.all([
    db.select().from(searches).where(eq(searches.searcher_id, 1)).orderBy(searches.created_at),
    db.select().from(searchFrequencies).orderBy(searchFrequencies.count),
  ]);

  return { searchHistory, popularSearches };
};
