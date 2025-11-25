import { db } from "$lib/database.server";
import { dayjs } from "../../../../helpers/dates.js";
import { changes } from "$lib/database/schema";
import { count, sql, asc, eq, gte, and } from "drizzle-orm";

// TODO(vxern): Limit.
// TODO(vxern): Paginate.
// TODO(vxern): Make sure to filter by the right user.

// We don't take anything other than entries into account because sources, categories, etc. are effectively one-off changes.
export const load = async (params) => {
  const [changeCount, changeCountByMonth, changeHistory] = await Promise.all([
    getChangeCount(),
    getChangeCountByMonth(),
    getChangeHistory(),
  ]);

  return { changeCount, changeCountByMonth, changeHistory };
};

function getChangeCount() {
  return db.$count(changes, and(eq(changes.changer_id, 1), eq(changes.changeable_type, "")));
}

async function getChangeCountByMonth() {
  const results = await db
    .select({ month: sql`EXTRACT(MONTH FROM ${changes.created_at}) - 1`.as("month"), count: count() })
    .from(changes)
    .where(gte(changes.created_at, dayjs().startOf("year")))
    .where(eq(changes.changer_id, 1))
    .groupBy(sql`month`);

  return results.reduce(
    (byMonth, { month, count }) => {
      byMonth[month] = count;

      return byMonth;
    },
    Array.from({ length: 12 }, () => 0),
  );
}

function getChangeHistory() {
  return db.query.changes.findMany({ where: (changes, { eq }) => eq(changes.changer_id, 1) });
}
