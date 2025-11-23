import { db } from "$lib/database.server";

export const load = async (params) => {
  return {
    // TODO(vxern): Make sure to filter by the user.
    user: await db.query.users.findFirst({ where: (users, { eq }) => eq(users.id, 1) }),
  };
};