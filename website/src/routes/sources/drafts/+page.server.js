import { redirect } from "@sveltejs/kit";
import { db, versionedDelete } from "$lib/database.server";
import { sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { sources: await getDraftSources() };
};

function getDraftSources() {
  return db.query.sources.findMany({
    where: {
      status: "draft",
      deleted: false,
      version: {
        // TODO(vxern): Update this later.
        author_id: 1,
      },
    },
    with: {
      authors: true,
    },
  });
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    
    // TODO(vxern): Validate access.

    const source = await versionedDelete({
      table: sources,
      id: data.get("id"),
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 1,
    });

    // TODO(vxern): Show toast.
    redirect(303, `/sources/drafts#${source.id}`);
  },
};
