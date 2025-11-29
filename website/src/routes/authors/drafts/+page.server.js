import { db } from "$lib/database.server";

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return {
    authors: await db.query.authors.findMany({ where: (authors, { eq }) => eq(authors.status, "draft") }),
  };
};