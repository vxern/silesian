import { db } from "$lib/database.server";
import { authors, authorsToLocations, locations, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return { authors: await getPendingAuthors(locals.session) };
};

function getPendingAuthors(session) {
  return db.query.authors.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        author_id: { ne: session.user.id },
      },
    },
    with: {
      locations: true,
    },
  });
}
