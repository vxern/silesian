import { redirect } from "@sveltejs/kit";
import { sources, authorsToSources, authors, versions } from "$lib/database/schema";
import { db, autocomplete } from "$lib/database.server";
import { sql, and, or, like, eq, ne } from "drizzle-orm";
import { json } from "@sveltejs/kit";

// TODO(vxern): Use prepared statements.
// TODO(vxern): Authorise.

export async function GET({ url }) {
  return json(await getSources(url.searchParams));
}

function getSources(params) {
  return autocomplete({
    table: sources,
    params,
    with: {
      authors: true,
    },
  });
}
