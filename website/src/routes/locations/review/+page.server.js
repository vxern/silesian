import { db } from "$lib/database.server";
import { locations, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return { locations: await getPendingLocations(locals.session) };
};

function getPendingLocations(session) {
  return db.query.locations.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        author_id: { ne: session.user.id },
      },
    },
  });
}
