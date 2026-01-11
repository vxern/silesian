import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { searches, searchFrequencies } from "$lib/database/schema";
import { eq, asc, desc } from 'drizzle-orm';

// TODO(vxern): Use prepared statements.

export const load = async ({ locals }) => {
  const [searchHistory, popularSearches] = await Promise.all([
    getSearchHistory(locals.session),
    getPopularSearches(),
  ]);

  return { searchHistory, popularSearches };
};

async function getSearchHistory(session) {
  const distinctSearches =
    db
      .selectDistinctOn([searches.lemma])
      .from(searches)
      .where(eq(searches.searcher_id, session.user.id))
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
    orderBy: {
      count: "desc",
    },
    limit: 28,
  });
}
