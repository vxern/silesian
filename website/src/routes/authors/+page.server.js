import { db } from "$lib/database.server";
import { authors } from "$lib/database/schema";
import { eq, count } from 'drizzle-orm';

export const load = async () => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    draftCount: db.$count(authors, eq(authors.status, "draft")),
    pendingCount: db.$count(authors, eq(authors.status, "pending")),
    authors: await db.query.authors.findMany({ where: (authors, { eq }) => eq(authors.status, "published") }),
  };
};