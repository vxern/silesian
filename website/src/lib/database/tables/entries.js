import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, text, integer, timestamp, check, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { entriesToCategories } from "./entries-to-categories";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { sources } from "./sources";
import { users } from "./users";

export const entries = pgTable("entries", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  lemma: text().notNull(),
  // TODO(vxern): Add lexemes.
  contents: text().notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id, { onDelete: "cascade" }).notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  version: integer().default(1).notNull(),
}, (t) => [
  check("lemma_not_empty_check", sql`${t.lemma} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const entriesRelations = relations(entries, ({ one, many }) => ({
  source: one(sources, { fields: [entries.source_id], references: [sources.id] }),
  categories: many(entriesToCategories),
}));

export const entriesInsertSchema = createInsertSchema(entries, {
  lemma: (z) => z.nonempty(),
});

export const entriesUpdateSchema = createUpdateSchema(entries, {
  lemma: (z) => z.nonempty(),
});
