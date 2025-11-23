import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { searches, searchFrequencies } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

// TODO(vxern): Use prepared statements.

export const load = async () => {
  // TODO(vxern): IMPORTANT - Filter by the correct user.
  const [searchHistory, popularSearches] = await Promise.all([
    db.query.searches.findMany({
      where: (searches, { eq }) => eq(searches.searcher_id, 1),
      orderBy: (searches, { desc }) => [desc(searches.created_at)],
      limit: 28,
    }),
    db.query.searchFrequencies.findMany({
      orderBy: (searchFrequencies, { desc }) => [desc(searchFrequencies.count)],
      limit: 28,
    }),
  ]);

  return { searchHistory, popularSearches };
};
