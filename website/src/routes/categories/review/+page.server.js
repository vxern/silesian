import { db } from "$lib/database.server";
import { categories, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return { categories: await getPendingCategories(locals.session) };
};

function getPendingCategories(session) {
  return db.query.categories.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        author_id: { ne: session.user.id },
      },
    },
  });
}
