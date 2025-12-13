import { redirect } from "@sveltejs/kit";
import { categories, versions } from "$lib/database/schema";
import { db } from "$lib/database.server";
import { sql, and, or, like, eq, ne } from "drizzle-orm";
import { json } from "@sveltejs/kit";

// TODO(vxern): Use prepared statements.
// TODO(vxern): Authorise.

export async function GET({ url }) {
  return json(await getCategories(url.searchParams));
}

function getCategories(params) {
  let statusClause;
  if (params.has("include_unpublished")) {
    return db
      .select({ categories })
      .from(categories)
      .withVersions()
      .where(
        and(
          // TODO(vxern): Exclude if the query is empty.
          like(categories.name, sql`'%${params.query}%'`),
          eq(categories.deleted, false),
          or(
            eq(categories.status, "published"),
            and(
              ne(categories.status, "published"),
              // TODO(vxern): Set the right author.
              eq(versions.author_id, 1),
            ),
          ),
        ),
      )
      .limit(params.limit ?? 100)
      .then((results) => results.map((result) => result.categories));
  }

  return db
    .select({ categories })
    .from(categories)
    .where(
      and(
        // TODO(vxern): Exclude if the query is empty.
        like(categories.name, sql`'%${params.query}%'`),
        eq(categories.deleted, false),
        eq(categories.status, "published"),
      ),
    )
    .limit(params.limit ?? 100)
    .then((results) => results.categories);
}

