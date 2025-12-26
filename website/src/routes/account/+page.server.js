import { db } from "$lib/database.server";
import { redirect } from "@sveltejs/kit"
import { users, versions } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const load = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user?.email) {
    redirect(303, "/login");
  }
  
  console.log(session);

  return ({
    // TODO(vxern): Filter by the right user.
    user: await getUser({ id: 1 })
  });;
}

function getUser({ id }) {
  return db.query.users.findFirst({
    where: { id },
    with: { version: true },
  });
}
