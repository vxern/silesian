import { db } from "$lib/database.server";
import { dayjs } from "../../../../helpers/dates.js";
import { entries } from "$lib/database/schema";
import { count, sql, asc, eq, gte } from "drizzle-orm";

// TODO(vxern): Limit.
// TODO(vxern): Paginate.
// TODO(vxern): Make sure to filter by the right user.

// We don't take anything other than entries into account because sources, categories, etc. are effectively one-off additions.
export const load = async (params) => {
  const [additionCount, additionCountByMonth, additionHistory] = await Promise.all([
    getAdditionCount(),
    getAdditionCountByMonth(),
    getAdditionHistory(),
  ]);

  return { additionCount, additionCountByMonth, additionHistory };
};

function getAdditionCount() {
  return db.$count(entries, eq(entries.author_id, 1));
}

async function getAdditionCountByMonth() {
  const results = await db
    .select({ month: sql`EXTRACT(MONTH FROM ${entries.created_at}) - 1`.as("month"), count: count() })
    .from(entries)
    .where(gte(entries.created_at, dayjs().startOf("year")))
    .where(eq(entries.author_id, 1))
    .groupBy(sql`month`);

  return results.reduce(
    (byMonth, { month, count }) => {
      byMonth[month] = count;

      return byMonth;
    },
    Array.from({ length: 12 }, () => 0),
  );
}

function getAdditionHistory() {
  return db.query.entries.findMany({ where: (entries, { eq }) => eq(entries.author_id, 1) });
}
