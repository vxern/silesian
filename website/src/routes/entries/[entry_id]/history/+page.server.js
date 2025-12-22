import { db } from "$lib/database.server";

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.
  const [entry, versions] = await Promise.all([
    getEntry({ id: params.entry_id }),
    getVersions({ id: params.entry_id }),
  ]);

  return { entry, versions };
};

function getEntry({ id }) {
  return db.query.entries.findFirst({
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
      versionable_type: "entries",
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
