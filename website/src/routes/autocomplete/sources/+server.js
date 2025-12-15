import { redirect } from "@sveltejs/kit";
import { sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { db } from "$lib/database.server";
import { sql, and, or, like, eq, ne } from "drizzle-orm";
import { json } from "@sveltejs/kit";

// TODO(vxern): Use prepared statements.
// TODO(vxern): Authorise.

export async function GET({ url }) {
  const sources = await getSources(url.searchParams);

  return json(sources);
}

function getSources(params) {
  let statusClause;
  if (params.has("include_unpublished")) {
    return db
      .select({ sources, authors })
      .from(sources)
      .withVersions()
      .where(
        and(
          // TODO(vxern): Exclude if the query is empty.
          like(sources.name, sql`'%${params.query}%'`),
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
      .limit(params.limit ?? 200)
      .leftJoin(authorsToSources, eq(authorsToSources.source_id, sources.id))
      .leftJoin(authors, eq(authors.id, authorsToSources.author_id))
      .then(
        (results) => Object.values(Object.groupBy(results, ({ sources }) => sources.id)).map(
          (results) => {
            const source = results[0].sources;

            source.authors = results.map((result) => result.authors).filter((author) => author);

            return source;
          }
        ),
      );
  }

  return db
    .select({ sources, authors })
    .from(sources)
    .where(
      and(
        // TODO(vxern): Exclude if the query is empty.
        like(sources.name, sql`'%${params.query}%'`),
        eq(sources.deleted, false),
        eq(sources.status, "published"),
      ),
    )
    .limit(params.limit ?? 100)
    .leftJoin(authorsToSources, eq(authorsToSources.source_id, sources.id))
    .leftJoin(authors, eq(authors.id, authorsToSources.author_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ sources }) => sources.id)).map(
        (results) => {
          const source = results[0].sources;

          source.authors = results.map((result) => result.authors).filter((author) => author);

          return source;
        }
      ),
    )
}

