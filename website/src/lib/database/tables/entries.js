import { defineRelationsPart, sql } from "drizzle-orm";
import { pgTable, bigint, text, integer, timestamp, check, boolean, index, unique } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { authorsToEntries } from "./authors-to-entries";
import { entriesToCategories } from "./entries-to-categories";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { sources } from "./sources";
import { users } from "./users";
import { versions } from "./versions";
import * as schema from "../schema";

export const entries = pgTable("entries", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  lemma: text().notNull(),
  normalised_lemma: text(),
  // TODO(vxern): Add lexemes.
  contents: text().notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id, { onDelete: "cascade" }).notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  current_version: integer().default(1).notNull(),
}, (t) => [
  check("lemma_not_empty_check", sql`${t.lemma} <> ''`),
  check("contents_not_empty_check", sql`${t.contents} <> ''`),
  unique().on(t.lemma, t.contents, t.source_id),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const entriesRelations = () => defineRelationsPart(schema, (r) => ({
  entries: {
    version: r.one.versions({
      from: [r.entries.id, r.entries.current_version],
      to: [r.versions.versionable_id, r.versions.version],
      where: {
        versionable_type: "entries",
      },
    }),
    bookmarks: r.many.bookmarks({
      from: r.entries.id,
      to: r.bookmarks.bookmarkable_id,
      where: {
        bookmarkable_type: "entries",
      },
    }),
    // If the authors are not filled out, we'll default to the source's authors.
    authors: r.many.authors({
      from: r.entries.id.through(r.authorsToEntries.entry_id),
      to: r.authors.id.through(r.authorsToEntries.author_id),
    }),
    categories: r.many.categories({
      from: r.entries.id.through(r.entriesToCategories.entry_id),
      to: r.categories.id.through(r.entriesToCategories.category_id),
    }),
    source: r.one.sources({
      from: r.entries.source_id,
      to: r.sources.id,
    }),
    // TODO(vxern): Add locations.
  },
}));

export const entriesInsertSchema = createInsertSchema(entries, {
  lemma: (z) => z.nonempty(),
  description: (z) => z.nonempty(),
});

export const entriesUpdateSchema = createUpdateSchema(entries, {
  lemma: (z) => z.nonempty(),
  description: (z) => z.nonempty(),
});
