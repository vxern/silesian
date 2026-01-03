import { redirect } from "@sveltejs/kit";
import { db, versionedUpdate, versionedJoin } from "$lib/database.server";
import { sources, authorsToSources, authors, sourcesUpdateSchema, idsSchema } from "$lib/database/schema";
import { eq, and, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { source: await getSource({ id: params.source_id }) };
};

function getSource({ id }) {
  return db.query.sources.findFirst({
    where: {
      id,
      status: "draft",
      deleted: false,
      version: {
        // TODO(vxern): Update this later.
        author_id: 1,
      },
    },
    with: {
      authors: true,
    },
  });
}

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    const sourceData = sourcesUpdateSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      name: data.get("name"),
      description: data.get("description") || null,
      url: data.get("url") || null,
      year: data.get("year") || null,
      orthography: data.get("orthography"),
      source_language: data.get("source_language"),
      target_language: data.get("target_language"),
      type: data.get("type") || null,
      licence: data.get("licence"),
      access: data.get("access"),
      redistributable: data.get("redistributable") === "1",
      total_entry_count: data.get("total_entry_count") ? Number(data.get("total_entry_count")) : null,
    });

    const authorIds = idsSchema.parse(JSON.parse(data.get("author_ids[]")));

    const source = await db.transaction(async (tx) => {
      const source = await versionedUpdate({
        table: sources,
        id: Number(data.get("id")),
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 1,
        values: sourceData,
        returning: { status: sources.status },
      });

      await versionedJoin({
        table: authorsToSources,
        source: source,
        sourceColumnName: "source_id",
        targetIds: authorIds,
        targetColumnName: "author_id",
        existingIds: await db
          .select({ id: authorsToSources.author_id })
          .from(authorsToSources)
          .where(eq(authorsToSources.source_id, source.id))
          .then((results) => results.map((result) => result.id)),
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 1,
      });

      return source;
    });

    // TODO(vxern): Handle failure.

    let redirectTo;
    if (source.status === "draft") {
      redirectTo = `/sources/drafts#${source.id}`;
    } else if (source.status === "pending") {
      redirectTo = `/sources/review#${source.id}`;
    } else {
      return error(500, { message: "Internal Server Error" });
    }

    redirect(303, redirectTo);
  },
};
