import { json, error } from "@sveltejs/kit";
import { db } from "$lib/database.server";
import { categories } from "$lib/database/schema";
import { eq } from 'drizzle-orm';

// TODO(vxern): Handle permissions.

export async function GET(request) {
  const category = await db.select().from(categories).where(eq(categories.id, Number(request.params.category_id))).limit(1).then((categories) => categories.at(0));
  if (!category) {
    error(404, { message: "Not Found" });
  }

  return json(category);
}