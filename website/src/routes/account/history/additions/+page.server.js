import { db } from "$lib/database.server";
import { dayjs } from "../../../../helpers/dates.js";
import { entries, versions } from "$lib/database/schema";
import { count, sql, asc, eq, gte } from "drizzle-orm";

// TODO(vxern): Limit.
// TODO(vxern): Paginate.

// We don't take anything other than entries into account because sources, categories, etc. are effectively one-off additions.

export const load = async ({ locals }) => {
  const [additionCount, additionCountByMonth, additionHistory] = await Promise.all([
    getAdditionCount(locals.session),
    getAdditionCountByMonth(locals.sessions),
    getAdditionHistory(locals.sessions),
  ]);

  return { additionCount, additionCountByMonth, additionHistory };
};

function getAdditionCount(session) {
  return db
    .select({ count: count() })
    .from(entries)
    .withVersions()
    .where(eq(versions.author_id, session.user.id))
    .then((results) => results.at(0).count);
}

async function getAdditionCountByMonth(session) {
  const results = await db
    .select({ month: sql`EXTRACT(MONTH FROM ${versions.created_at}) - 1`.as("month"), count: count() })
    .from(entries)
    .withVersions()
    .where(eq(versions.author_id, session.user.id))
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

function getAdditionHistory(session) {
  return db
    .select()
    .from(entries)
    .withVersions()
    .where(eq(versions.author_id, session.user.id));
}
