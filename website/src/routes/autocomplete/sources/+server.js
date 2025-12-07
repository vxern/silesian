import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sql } from "drizzle-orm";
import { json } from "@sveltejs/kit";

// TODO(vxern): Validate.
// TODO(vxern): Authorise.

export async function GET({ params }) {
  return json(await getSources(params));
}

function getSources({ query, limit }) {
  return db.query.sources.findMany({
    where: (sources, { like }) => like(sources.name, sql`'%${query}%'`),
    limit: limit ?? 100,
  });
}
