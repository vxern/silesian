import { db } from "$lib/database.server";
import { dayjs } from "../../../../helpers/dates.js";
import { versions } from "$lib/database/schema";
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
  return db.$count(versions, and(eq(versions.author_id, 1), eq(versions.versionable_type, "entries")));
}

async function getChangeCountByMonth() {
  const results = await db
    .select({ month: sql`EXTRACT(MONTH FROM ${versions.created_at}) - 1`.as("month"), count: count() })
    .from(versions)
    .where(gte(versions.created_at, dayjs().startOf("year")))
    .where(eq(versions.author_id, 1))
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
  return db.query.versions.findMany({ where: (versions, { eq }) => eq(versions.author_id, 1) });
}
