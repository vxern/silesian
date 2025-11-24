import { db } from "$lib/database.server";
import { searches } from "$lib/database/schema";
import { count } from "drizzle-orm";

// TODO(vxern): Limit.
// TODO(vxern): Paginate.
// TODO(vxern): Make sure to filter by the right user.

export const load = async (params) => {
  const [searchCount, searchHistory] = await Promise.all([
    db.select({ count: count() }).from(searches).then((results) => results.at(0).count),
    db.query.searches.findMany({ where: (searches, { eq }) => eq(searches.searcher_id, 1) }),
  ]);

  return { searchCount, searchHistory };
};