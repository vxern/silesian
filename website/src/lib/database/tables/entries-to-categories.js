import { relations } from "drizzle-orm";
import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { entries } from "./entries";
import { categories } from "./categories";

export const entriesToCategories = pgTable("entries_to_categories", {
  id: bigint({ mode: "number" }).generatedAlwaysAsIdentity(),
  entry_id: bigint({ mode: "number" }).references(() => entries.id, { onDelete: "cascade" }).notNull(),
  category_id: bigint({ mode: "number" }).references(() => categories.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.entry_id, t.category_id] })]);

export const entriesToCategoriesRelations = relations(entriesToCategories, ({ one }) => ({
  entry: one(entries, { fields: [entriesToCategories.entry_id], references: [entries.id] }),
  category: one(categories, { fields: [entriesToCategories.category_id], references: [categories.id] }),
}));
