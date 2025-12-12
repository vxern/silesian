import { db } from "$lib/database.server";
import { users, versions } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const load = async (params) => {
  // TODO(vxern): Make sure to filter by the right user.
  return { user: await getUser({ id: 2 }) };
};

function getUser({ id }) {
  return db
    .select({ users, versions })
    .from(users)
    .withVersions()
    .where(eq(users.id, id))
    .limit(1)
    .then(
      (results) => results.map(
        (result) => {
          const user = result.users;

          user.version = result.versions;

          return user;
        },
      ).at(0),
    );
}
