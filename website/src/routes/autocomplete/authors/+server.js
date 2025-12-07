import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { sql } from "drizzle-orm";
import { json } from "@sveltejs/kit";

// TODO(vxern): Use prepared statements.
// TODO(vxern): Authorise.

export async function GET({ params }) {
  return json(await getAuthors(params));
}

function getAuthors({ query, limit }) {
  return db.query.authors.findMany({
    where: (authors, { like }) => like(authors.name, sql`'%${query}%'`),
    limit: limit ?? 100,
  });
}
