import { json, error } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sources } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

// TODO(vxern): Handle permissions.

export async function GET(request) {
  const source = await db.select().from(sources).where(eq(sources.id, Number(request.params.source_id))).limit(1).then((sources) => sources.at(0));
  if (!source) {
    error(404, { message: "Not Found" });
  }

  return json(source);
}