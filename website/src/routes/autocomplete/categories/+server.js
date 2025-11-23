import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { eq } from 'drizzle-orm';
import { json } from "@sveltejs/kit";

// TODO(vxern): Use prepared statements.
// TODO(vxern): Limit.
// TODO(vxern): Authorise.

export async function GET() {
  return json(await db.query.categories.findMany());
}
