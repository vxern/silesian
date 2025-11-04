import { json } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { licences } from "$lib/database/schema";

// TODO(vxern): Do not return deleted licences.

export async function GET() {
  return json(await db.select().from(licences));
}