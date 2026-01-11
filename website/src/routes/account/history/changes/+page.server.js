import { db } from "$lib/database.server";
import { dayjs } from "../../../../helpers/dates.js";
import { versions } from "$lib/database/schema";
import { count, sql, asc, eq, gte, and } from "drizzle-orm";

// TODO(vxern): Limit.
// TODO(vxern): Paginate.

// We don't take anything other than entries into account because sources, categories, etc. are effectively one-off changes.
export const load = async ({ locals }) => {
  const [changeCount, changeCountByMonth, changeHistory] = await Promise.all([
    getChangeCount(locals.session),
    getChangeCountByMonth(locals.session),
    getChangeHistory(locals.session),
  ]);

  return { changeCount, changeCountByMonth, changeHistory };
};

function getChangeCount(session) {
  return db.$count(
    versions,
    and(
      eq(versions.author_id, session.user.id),
      eq(versions.versionable_type, "entries"),
    ),
  );
}

async function getChangeCountByMonth(session) {
  const results = await db
    .select({ month: sql`EXTRACT(MONTH FROM ${versions.created_at}) - 1`.as("month"), count: count() })
    .from(versions)
    .where(gte(versions.created_at, dayjs().startOf("year")))
    .where(eq(versions.author_id, session.user.id))
    .groupBy(sql`month`);

  return results.reduce(
    (byMonth, { month, count }) => {
      byMonth[month] = count;

      return byMonth;
    },
    Array.from({ length: 12 }, () => 0),
  );
}

function getChangeHistory(session) {
  return db.query.versions.findMany({
    where: {
      author_id: session.user.id,
    },
  });
}
