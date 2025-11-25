import { db } from "$lib/database.server";
import { dayjs } from "../../../../helpers/dates.js";
import { reviews, changes, entries } from "$lib/database/schema";
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
  return db.$count(reviews);
}

async function getReviewCountByMonth() {
  const results = await db
    .select({ month: sql`EXTRACT(MONTH FROM ${reviews.created_at}) - 1`.as("month"), count: count() })
    .from(reviews)
    .where(gte(reviews.created_at, dayjs().startOf("year")))
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
    .leftJoin(changes, eq(reviews.change_id, changes.id))
    .leftJoin(entries, and(eq(changes.changeable_type, "entries"), eq(changes.changeable_id, reviews.id)));
}