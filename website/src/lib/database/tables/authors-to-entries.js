import { relations } from "drizzle-orm";
import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { authors } from "./authors";
import { entries } from "./entries";

export const authorsToEntries = pgTable("authors_to_entries", {
  author_id: bigint({ mode: "number" }).references(() => authors.id, { onDelete: "cascade" }).notNull(),
  entry_id: bigint({ mode: "number" }).references(() => entries.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.author_id, t.entry_id] })]);

export const authorsToEntriesRelations = relations(authorsToEntries, ({ one }) => ({
  author: one(authors, { fields: [authorsToEntries.author_id], references: [authors.id] }),
  entry: one(entries, { fields: [authorsToEntries.entry_id], references: [entries.id] }),
}));
