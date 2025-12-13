import { redirect } from "@sveltejs/kit";
import { db, versionedUpdate, versionedJoin } from "$lib/database.server";
import { entries, entriesToCategories, categories, sources, entriesToCategories, versions, entriesUpdateSchema, idsSchema } from "$lib/database/schema";
import { eq, and } from 'drizzle-orm';

export const load = async ({ params }) => {
  // TODO(vxern): Kick the user out if they haven't got permission.
  // TODO(vxern): Validate the parameter.

  return { entry: await getEntry({ id: params.entry_id }) };
};

/** Performs 1 query. */
function getEntry({ id }) {
  return db
    .select({ entries, sources, categories })
    .from(entries)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Set the right author.
        eq(versions.author_id, 1),
        eq(entries.id, id),
        eq(entries.deleted, false),
        eq(entries.status, "draft"),
      ),
    )
    .innerJoin(sources, eq(sources.id, entries.source_id))
    .leftJoin(entriesToCategories, eq(entriesToCategories.entry_id, entries.id))
    .leftJoin(categories, eq(categories.id, entriesToCategories.category_id))
    .then(
      (results) => Object.values(Object.groupBy(results, ({ entries }) => entries.id)).map(
        (results) => {
          const entry = results[0].entries;

          entry.source = results[0].sources;
          entry.categories = results.map((result) => result.categories).filter((category) => category);

          return entry;
        }
      ).at(0),
    );
}

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();

    // TODO(vxern): IMPORTANT - Validate the source.

    const entryData = entriesUpdateSchema.parse({
      status: data.has("draft") ? "draft" : "pending",
      lemma: data.get("lemma"),
      contents: data.get("contents"),
      source_id: data.get("source_id") ? Number(data.get("source_id")) : null,
    });

    const categoryIds = idsSchema.parse(JSON.parse(data.get("category_ids[]")));

    const entry = await db.transaction(async (tx) => {
      const entry = await versionedUpdate({
        table: entries,
        id: Number(data.get("id")),
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 1,
        values: entryData,
        returning: { lemma: entries.lemma },
      });

      await versionedJoin({
        table: entriesToCategories,
        source: entry,
        sourceColumnName: "entry_id",
        targetIds: categoryIds,
        targetColumnName: "category_id",
        existingIds: await db
          .select({ id: entriesToCategories.category_id })
          .from(entriesToCategories)
          .where(eq(entriesToCategories.entry_id, entry.id))
          .then((results) => results.map((result) => result.id)),
        // TODO(vxern): IMPORTANT - Update the author ID.
        authorId: 1,
      });

      return entry;
    });

    // TODO(vxern): Handle failure.

    redirect(303, `/entries/drafts`);
  },
};