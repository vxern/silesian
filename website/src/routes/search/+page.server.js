import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { searches, searchFrequencies } from "$lib/database/schema";
import { eq, asc, desc } from 'drizzle-orm';

// TODO(vxern): Use prepared statements.
// TODO(vxern): IMPORTANT - Filter by the correct user.

/** Performs 2 queries in total. */
export const load = async () => {
  const [searchHistory, popularSearches] = await Promise.all([
    getSearchHistory(),
    getPopularSearches(),
  ]);

  return { searchHistory, popularSearches };
};

async function getSearchHistory() {
  const distinctSearches =
    db
      .selectDistinctOn([searches.lemma])
      .from(searches)
      .where(eq(searches.searcher_id, 2))
      .orderBy(searches.lemma, asc(searches.created_at))
      .limit(28)
      .as("distinct_searches");

  return db
    .select()
    .from(distinctSearches)
    .orderBy(asc(distinctSearches.created_at));
}

function getPopularSearches() {
  return db.query.searchFrequencies.findMany({
    orderBy: (searchFrequencies, { desc }) => [desc(searchFrequencies.count)],
    limit: 28,
  });
}
