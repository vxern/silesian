import { db } from "$lib/database.server";

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.
  const [category, versions] = await Promise.all([
    getCategory({ id: params.category_id }),
    getVersions({ id: params.category_id }),
  ]);

  return { category, versions };
};

function getCategory({ id }) {
  return db.query.categories.findFirst({
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
      versionable_type: "categories",
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
