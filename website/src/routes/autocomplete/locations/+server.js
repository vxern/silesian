import { redirect } from "@sveltejs/kit";
import { locations, versions } from "$lib/database/schema";
import { db } from "$lib/database.server";
import { sql, and, or, like, eq, ne } from "drizzle-orm";
import { json } from "@sveltejs/kit";

// TODO(vxern): Use prepared statements.
// TODO(vxern): Authorise.

export async function GET({ url }) {
  return json(await getLocations(url.searchParams));
}

function getLocations(params) {
  let statusClause;
  if (params.has("include_unpublished")) {
    return db
      .select({ locations })
      .from(locations)
      .withVersions()
      .where(
        and(
          // TODO(vxern): Exclude if the query is empty.
          like(locations.name, sql`'%${params.query}%'`),
          eq(locations.deleted, false),
          or(
            eq(locations.status, "published"),
            and(
              ne(locations.status, "published"),
              // TODO(vxern): Set the right author.
              eq(versions.author_id, 1),
            ),
          ),
        ),
      )
      .limit(params.limit ?? 100)
      .then((results) => results.map((result) => result.locations));
  }

  return db
    .select({ locations })
    .from(locations)
    .where(
      and(
        // TODO(vxern): Exclude if the query is empty.
        like(locations.name, sql`'%${params.query}%'`),
        eq(locations.deleted, false),
        eq(locations.status, "published"),
      ),
    )
    .limit(params.limit ?? 100)
    .then((results) => results.locations);
}

