import { db } from "$lib/database.server";

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.
  const [source, versions] = await Promise.all([
    getSource({ id: params.source_id }),
    getVersions({ id: params.source_id }),
  ]);

  return { source, versions };
};

function getSource({ id }) {
  return db.query.sources.findFirst({
    where: {
      id,
      // TODO(vxern): Add this back.
      // status: { ne: "draft" },
      deleted: false,
    },
  });
}

function getVersions({ id }) {
  return db.query.versions.findMany({
    where: {
      versionable_type: "sources",
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
