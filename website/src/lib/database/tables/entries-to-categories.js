import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { entries } from "./entries";
import { categories } from "./categories";

export const entriesToCategories = pgTable("entries_to_categories", {
  entry_id: bigint({ mode: "number" }).references(() => entries.id, { onDelete: "cascade" }).notNull(),
  category_id: bigint({ mode: "number" }).references(() => categories.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.entry_id, t.category_id] })]);
