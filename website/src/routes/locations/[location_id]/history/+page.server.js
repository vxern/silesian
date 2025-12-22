import { db } from "$lib/database.server";

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.
  const [location, versions] = await Promise.all([
    getLocation({ id: params.location_id }),
    getVersions({ id: params.location_id }),
  ]);

  return { location, versions };
};

function getLocation({ id }) {
  return db.query.locations.findFirst({
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
      versionable_type: "locations",
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
