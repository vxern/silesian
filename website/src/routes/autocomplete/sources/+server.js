import { redirect } from "@sveltejs/kit";
import { sources, versions } from "$lib/database/schema";
import { db } from "$lib/database.server";
import { sql, and, or, like, eq, ne } from "drizzle-orm";
import { json } from "@sveltejs/kit";

// TODO(vxern): Use prepared statements.
// TODO(vxern): Authorise.

export async function GET({ url }) {
  return json(await getSources(url.searchParams));
}

function getSources(params) {
  let statusClause;
  if (params.has("include_unpublished")) {
    return db
      .select({ sources })
      .from(sources)
      .withVersions()
      .where(
        and(
          eq(sources.deleted, false),
          or(
            eq(sources.status, "published"),
            and(
              ne(sources.status, "published"),
              // TODO(vxern): Set the right author.
              eq(versions.author_id, 1),
            ),
          ),
        ),
      )
      .limit(params.limit ?? 100)
      .then((results) => results.map((result) => result.sources));
  }

  return db
    .select({ sources })
    .from(sources)
    .where(
      and(
        like(sources.name, sql`'%${params.query}%'`),
        eq(sources.status, "published"),
      ),
    )
    .limit(params.limit ?? 100)
    .then((results) => results.sources);
}

