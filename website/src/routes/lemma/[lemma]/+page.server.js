import { db } from "$lib/database.server";
import { entries, entriesToCategories, categories, authorsToSources, authors, sources, entriesInsertSchema, idsSchema } from "$lib/database/schema";
import { sql, and, eq, like, asc } from "drizzle-orm";

export const load = async ({ params }) => {
  // TODO(vxern): Filter the status as well.
  return {
    // TODO(vxern): IMPORTANT - This needs to be a lot smarter.
    entries: await getEntries({ lemma: params.lemma }),
  };
};

function getEntries({ lemma }) {
  const similarity = sql`levenshtein(${entries.lemma}, ${lemma})`

  return db
    .select({
      entries,
      sources,
      authors,
      categories,
      similarity,
    })
    .from(entries)
    .withVersions()
    .where(
      and(
        // TODO(vxern): Needs validating.
        like(entries.lemma, `%${lemma}%`),
        eq(entries.deleted, false),
      ),
    )
    .innerJoin(sources, eq(sources.id, entries.source_id))
    .leftJoin(authorsToSources, eq(authorsToSources.source_id, sources.id))
    .leftJoin(authors, eq(authors.id, authorsToSources.author_id))
    .leftJoin(entriesToCategories, eq(entriesToCategories.entry_id, entries.id))
    .leftJoin(categories, eq(categories.id, entriesToCategories.category_id))
    .then(
      (results) =>
        Object.values(Object.groupBy(results, ({ entries }) => entries.id))
          .toSorted((a, b) => a[0].similarity - b[0].similarity)
          .map(
        (results) => {
          const entry = results[0].entries;

          entry.categories = results.map((result) => result.categories).filter((category) => category);

          entry.source = results[0].sources;

          entry.source.authors = results.map((result) => result.authors).filter((authors) => authors);

          return entry;
        }
      ),
    )
}
