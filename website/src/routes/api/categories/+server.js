import { json } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { categories } from "$lib/database/schema";

export async function GET() {
  return json(await db.select().from(categories));
}