import { db } from "$lib/database.server";

// TODO(vxern): Limit.
// TODO(vxern): Paginate.
// TODO(vxern): Make sure to filter by the right user.

export const load = async (params) => {
  return {
    searches: await db.query.searches.findMany({ where: (searches, { eq }) => eq(searches.searcher_id, 1) }),
  };
};