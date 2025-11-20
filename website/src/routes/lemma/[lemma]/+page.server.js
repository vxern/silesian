import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";
import { like, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Filter the status as well.

  return {
    // TODO(vxern): IMPORTANT - This needs to be a lot smarter.
    entries: db.select().from(entries).where(like(entries.lemma, params.lemma))
  };
};
