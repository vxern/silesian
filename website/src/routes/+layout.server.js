import { db } from "$lib/database.server";

export const load = async (event) => {
  const session = await event.locals.auth();
  if (!session) {
    return;
  }

  const user = await db.query.users.findFirst({
    auth_user_id: session.user.id,
    with: {
      roles: true,
    },
  });
  if (!user) {
    return;
  }

  const permissions = new Set(user.roles.flatMap((role) => role.permissions));
  
  return { session, permissions };
};