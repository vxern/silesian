import { json, error } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";

// TODO(vxern): Handle permissions.

export async function GET(request) {
  const entry = await db.select().from(entries).where({ id: request.params.entry_id }).limit(1).then((entries) => entries.at(0));
  if (!entry) {
    error(404, { message: "Not Found" });
  }

  return json(entry);
}