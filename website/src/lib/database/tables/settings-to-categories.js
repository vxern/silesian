import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { settings } from "./settings";
import { categories } from "./categories";

export const settingsToCategories = pgTable("settings_to_categories", {
  settings_id: bigint({ mode: "number" }).references(() => settings.id, { onDelete: "cascade" }).notNull(),
  category_id: bigint({ mode: "number" }).references(() => categories.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.settings_id, t.category_id] })]);
