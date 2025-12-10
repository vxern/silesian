import { relations } from "drizzle-orm";
import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { settings } from "./settings";
import { sources } from "./sources";

export const settingsToSources = pgTable("settings_to_sources", {
  settings_id: bigint({ mode: "number" }).references(() => settings.id, { onDelete: "cascade" }).notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.settings_id, t.source_id] })]);

export const settingsToSourcesRelations = relations(settingsToSources, ({ one }) => ({
  settings: one(settings, { fields: [settingsToSources.settings_id], references: [settings.id] }),
  source: one(sources, { fields: [settingsToSources.source_id], references: [sources.id] }),
}));