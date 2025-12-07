import { db } from "$lib/database.server";
import { users } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const load = async (params) => {
  const data = await db.select()
      .from(users)
      .withVersions()
      .where(eq(users.id, 2))
      .limit(1)
      .then((results) => {
        const result = results.at(0);

        result.users.versions = result.versions;

        return result.users;
      });

  return {
    // TODO(vxern): Make sure to filter by the user.
    user: data,
  };
};
