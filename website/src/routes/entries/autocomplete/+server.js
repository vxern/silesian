import { entries } from "$lib/database/schema";
import { autocomplete } from "$lib/database.server";
import { json } from "@sveltejs/kit";

// TODO(vxern): Use prepared statements.
// TODO(vxern): Authorise.

export async function GET({ url }) {
  return json(await getEntries(url.searchParams));
}

function getEntries(params) {
  return autocomplete({ table: entries, params, term: "lemma"});
}
