import { relations } from "drizzle-orm";
import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { settings } from "./settings";
import { categories } from "./categories";

export const settingsToCategories = pgTable("settings_to_categories", {
  settings_id: bigint({ mode: "number" }).references(() => settings.id, { onDelete: "cascade" }).notNull(),
  category_id: bigint({ mode: "number" }).references(() => categories.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.settings_id, t.category_id] })]);

export const settingsToCategoriesRelations = relations(settingsToCategories, ({ one }) => ({
  settings: one(settings, { fields: [settingsToCategories.settings_id], references: [settings.id] }),
  category: one(categories, { fields: [settingsToCategories.category_id], references: [categories.id] }),
}));
