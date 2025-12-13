import { redirect } from "@sveltejs/kit";
import { authors, versions } from "$lib/database/schema";
import { db } from "$lib/database.server";
import { sql, and, or, like, eq, ne } from "drizzle-orm";
import { json } from "@sveltejs/kit";

// TODO(vxern): Use prepared statements.
// TODO(vxern): Authorise.

export async function GET({ url }) {
  return json(await getAuthors(url.searchParams));
}

function getAuthors(params) {
  let statusClause;
  if (params.has("include_unpublished")) {
    return db
      .select({ authors })
      .from(authors)
      .withVersions()
      .where(
        and(
          eq(authors.deleted, false),
          or(
            eq(authors.status, "published"),
            and(
              ne(authors.status, "published"),
              // TODO(vxern): Set the right author.
              eq(versions.author_id, 1),
            ),
          ),
        ),
      )
      .limit(params.limit ?? 100)
      .then((results) => results.map((result) => result.authors));
  }

  return db
    .select({ authors })
    .from(authors)
    .where(
      and(
        like(authors.name, sql`'%${params.query}%'`),
        eq(authors.status, "published"),
      ),
    )
    .limit(params.limit ?? 100)
    .then((results) => results.authors);
}
