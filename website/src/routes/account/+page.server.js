import { db } from "$lib/database.server";
import { users, versions } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const load = async (params) => ({
  // TODO(vxern): Filter by the right user.
  user: await getUser({ id: 1 })
});

function getUser({ id }) {
  return db.query.users.findFirst({
    where: { id },
    with: { version: true },
  });
}
