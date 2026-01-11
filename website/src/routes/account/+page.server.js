import { db } from "$lib/database.server";
import { redirect } from "@sveltejs/kit"
import { users, versions } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const load = async ({ locals }) => {
  if (!locals.session) {
    redirect(303, "/login");
  }
  
  return ({
    user: await getUser({ id: locals.session.user.id })
  });;
}

function getUser({ id }) {
  return db.query.users.findFirst({
    where: { id },
    with: { version: true },
  });
}
