import { db } from "$lib/database.server";
import { users, versions } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const load = async ({ locals }) => ({
  user: await getUser({ id: locals.session.user.id })
});

function getUser({ id }) {
  return db.query.users.findFirst({
    where: { id },
    with: { version: true },
  });
}
