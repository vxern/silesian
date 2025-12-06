import { relations } from "drizzle-orm";
import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { authors } from "./authors";
import { sources } from "./sources";

export const authorsToSources = pgTable("authors_to_sources", {
  id: bigint({ mode: "number" }).generatedAlwaysAsIdentity(),
  author_id: bigint({ mode: "number" }).references(() => authors.id, { onDelete: "cascade" }).notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.author_id, t.source_id] })]);

export const authorsToSourcesRelations = relations(authorsToSources, ({ one }) => ({
  author: one(authors, { fields: [authorsToSources.author_id], references: [authors.id] }),
  source: one(sources, { fields: [authorsToSources.source_id], references: [sources.id] }),
}));
