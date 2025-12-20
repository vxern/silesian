import { db } from "$lib/database.server";
import { sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, ne, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { sources: await getPendingSources() };
};

function getPendingSources() {
  return db.query.sources.findMany({
    where: {
      status: "pending",
      deleted: false,
      version: {
        // TODO(vxern): Update this later.
        author_id: { ne: 1 },
      },
    },
    with: {
      authors: true,
    },
  });
}
