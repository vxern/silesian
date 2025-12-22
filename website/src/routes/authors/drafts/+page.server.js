import { db, versionedDelete } from "$lib/database.server";
import { authors, authorsToLocations, locations, versions } from "$lib/database/schema";
import { and, eq } from 'drizzle-orm';

export const load = async () => {
  // TODO(vxern): Make sure to filter by the user.

  return { authors: await getDraftAuthors() };
};

function getDraftAuthors() {
  return db.query.authors.findMany({
    where: {
      status: "draft",
      deleted: false,
      version: {
        // TODO(vxern): Update this later.
        author_id: 1,
      },
    },
    with: {
      locations: true,
    },
  });
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    
    // TODO(vxern): Validate access.

    const author = await versionedDelete({
      table: authors,
      id: data.get("id"),
      // TODO(vxern): IMPORTANT - Update the author ID.
      authorId: 1,
    });

    // TODO(vxern): Show toast.
    redirect(303, "/authors/drafts");
  },
};
