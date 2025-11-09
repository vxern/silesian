import { json } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

export async function GET() {
  return json(await db.select().from(sources).where(eq(sources.status, "draft")));
}