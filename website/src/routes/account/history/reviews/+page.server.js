import { db } from "$lib/database.server";
import { dayjs } from "../../../../helpers/dates.js";
import { reviews, versions, entries } from "$lib/database/schema";
import { count, sql, asc, gte, and, eq } from "drizzle-orm";

// TODO(vxern): Limit.
// TODO(vxern): Paginate.
// TODO(vxern): Make sure to filter by the right user.

export const load = async (params) => {
  const [reviewCount, reviewCountByMonth, reviewHistory] = await Promise.all([
    getReviewCount(),
    getReviewCountByMonth(),
    getReviewHistory(),
  ]);

  return { reviewCount, reviewCountByMonth, reviewHistory };
};

function getReviewCount() {
  return db
    .select({ count: count() })
    .from(reviews)
    .innerJoin(versions, eq(reviews.version_id, versions.id))
    .where(eq(versions.author_id, 2))
    .then((results) => results.at(0).count);
}

async function getReviewCountByMonth() {
  const results = await db
    .select({ month: sql`EXTRACT(MONTH FROM ${versions.created_at}) - 1`.as("month"), count: count() })
    .from(reviews)
    .innerJoin(versions, eq(reviews.version_id, versions.id))
    .where(gte(versions.created_at, dayjs().startOf("year")))
    .where(eq(reviews.reviewer_id, 1))
    .groupBy(sql`month`);

  return results.reduce(
    (byMonth, { month, count }) => {
      byMonth[month] = count;

      return byMonth;
    },
    Array.from({ length: 12 }, () => 0),
  );
}

function getReviewHistory() {
  return db
    .select({ entry: entries })
    .from(reviews)
    .innerJoin(versions, eq(reviews.version_id, versions.id))
    .innerJoin(entries, and(eq(versions.versionable_type, "entries"), eq(versions.versionable_id, versions.id)));
}