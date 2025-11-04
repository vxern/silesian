import { json, error } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { licences } from "$lib/database/schema";

// TODO(vxern): Handle permissions.

export async function GET(request) {
  const licence = await db.select().from(licences).where({ id: request.params.licence_id }).limit(1).then((licences) => licences.at(0));
  if (!licence) {
    error(404, { message: "Not Found" });
  }

  return json(licence);
}