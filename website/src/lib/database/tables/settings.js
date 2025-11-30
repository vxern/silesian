import { relations } from "drizzle-orm";
import { pgTable, bigint, boolean, unique, timestamp } from "drizzle-orm/pg-core";
import { languagesEnum } from "../enums/languages";
import { themesEnum } from "../enums/themes";
import { orthographiesEnum } from "../enums/orthographies";
import { licencesEnum } from "../enums/licences";
import { accessesEnum } from "../enums/accesses";
import { users } from "./users";
import { settingsToCategories } from "./settings-to-categories";
import { settingsToSources } from "./settings-to-sources";

export const settings = pgTable("settings", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  user_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // Basic settings
  language: languagesEnum().default("szl").notNull(),
  theme: themesEnum().default("dark").notNull(),
  // Preferences
  strict_search: boolean().default(false).notNull(),
  limit_sources: boolean().default(false).notNull(),
  limit_categories: boolean().default(false).notNull(),
  limit_source_languages: boolean().default(false).notNull(),
  limit_target_languages: boolean().default(false).notNull(),
  limit_orthographies: boolean().default(false).notNull(),
  limit_licences: boolean().default(false).notNull(),
  limit_accesses: boolean().default(false).notNull(),
  limited_to_source_languages: languagesEnum().array().default([]).notNull(),
  limited_to_target_languages: languagesEnum().array().default([]).notNull(),
  limited_to_orthographies: orthographiesEnum().array().default([]).notNull(),
  limited_to_licences: licencesEnum().array().default([]).notNull(),
  limited_to_accesses: accessesEnum().array().default([]).notNull(),
}, (t) => [unique().on(t.user_id)]);

export const settingsRelations = relations(settings, ({ one, many }) => ({
  user: one(users, { fields: [settings.user_id], references: [users.id] }),
  sources: many(settingsToSources),
  categories: many(settingsToCategories),
}));
