import { db } from "$lib/database.server";
import { users } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const load = async (params) => {
  // TODO(vxern): Make sure to filter by the right user.
  return { user: await getUser({ id: 2 }) };
};

function getUser({ id }) {
  return db
    .select()
    .from(users)
    .withVersions()
    .where(eq(users.id, id))
    .limit(1)
    .then((results) => {
      const result = results.at(0);

      result.users.version = result.versions;

      return result.users;
    });
}
