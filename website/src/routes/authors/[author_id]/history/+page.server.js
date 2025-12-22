import { db } from "$lib/database.server";

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.
  const [author, versions] = await Promise.all([
    getAuthor({ id: params.author_id }),
    getVersions({ id: params.author_id }),
  ]);

  return { author, versions };
};

function getAuthor({ id }) {
  return db.query.authors.findFirst({
    where: {
      id,
      status: { ne: "draft" },
      deleted: false,
    },
  });
}

function getVersions({ id }) {
  return db.query.versions.findMany({
    where: {
      versionable_type: "authors",
      versionable_id: id,
    },
    with: {
      author: true,
    },
    orderBy: {
      version: "desc",
    },
  });
}
