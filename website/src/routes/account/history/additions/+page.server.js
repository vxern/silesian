import { db } from "$lib/database.server";
import { dayjs } from "../../../../helpers/dates.js";
import { entries, versions } from "$lib/database/schema";
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
  return db
    .select({ count: count() })
    .from(entries)
    .withVersions()
    .where(eq(versions.author_id, 1))
    .then((results) => results.at(0).count);
}

async function getAdditionCountByMonth() {
  const results = await db
    .select({ month: sql`EXTRACT(MONTH FROM ${versions.created_at}) - 1`.as("month"), count: count() })
    .from(entries)
    .withVersions()
    .where(eq(versions.author_id, 1))
    .where(gte(versions.created_at, dayjs().startOf("year")))
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
  return db
    .select()
    .from(entries)
    .withVersions()
    .where(eq(versions.author_id, 1));
}
