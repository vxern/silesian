import { json } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { entries, sources } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

export async function GET() {
  const results = await db.select().from(entries).where(eq(entries.status, "published")).fullJoin(sources, eq(sources.id, entries.source_id));

  return json(results.map((result) => {
    const entry = {
      ...result.entries,
      source: result.sources,
    }
    delete entry["source_id"];

    return entry;
  }));
}