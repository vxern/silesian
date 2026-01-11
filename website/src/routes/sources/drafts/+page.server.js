import { redirect } from "@sveltejs/kit";
import { db, versionedDelete } from "$lib/database.server";
import { sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
  return { sources: await getDraftSources(locals.session) };
};

function getDraftSources(session) {
  return db.query.sources.findMany({
    where: {
      status: "draft",
      deleted: false,
      version: {
        author_id: session.user.id,
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
