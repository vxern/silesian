import { db } from "$lib/database.server";
import { dayjs } from "../../../../helpers/dates.js";
import { searches } from "$lib/database/schema";
import { count, sql, asc, gte, eq } from "drizzle-orm";

// TODO(vxern): Limit.
// TODO(vxern): Paginate.

export const load = async ({ locals }) => {
  const [searchCount, searchCountByMonth, searchHistory] = await Promise.all([
    getSearchCount(),
    getSearchCountByMonth(locals.session),
    getSearchHistory(locals.session),
  ]);

  return { searchCount, searchCountByMonth, searchHistory };
};

function getSearchCount() {
  return db.$count(searches);
}

async function getSearchCountByMonth(session) {
  const results = await db
    .select({ month: sql`EXTRACT(MONTH FROM ${searches.created_at}) - 1`.as("month"), count: count() })
    .from(searches)
    .where(gte(searches.created_at, dayjs().startOf("year")))
    .where(eq(searches.searcher_id, session.user.id))
    .groupBy(sql`month`);

  return results.reduce(
    (byMonth, { month, count }) => {
      byMonth[month] = count;

      return byMonth;
    },
    Array.from({ length: 12 }, () => 0),
  );
}

function getSearchHistory(session) {
  return db.query.searches.findMany({
    where: {
      searcher_id: session.user.id,
    },
  });
}