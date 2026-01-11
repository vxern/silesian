import { db } from "$lib/database.server";
import { sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return { sources: await getPendingSources(locals.session) };
};

function getPendingSources(session) {
  return db.query.sources.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        author_id: { ne: session.user.id },
      },
    },
    with: {
      authors: true,
    },
  });
}
