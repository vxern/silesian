import { json } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { entries, categories } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

export async function GET() {
  const results = await db.select().from(entries).where(eq(entries.status, "pending")).fullJoin(sources, eq(sources.id, entries.source_id));

  return json(results.map((result) => {
    const entry = {
      ...result.entries,
      source: result.categories,
    }
    delete entry["category_id"];

    return entry;
  }));
}