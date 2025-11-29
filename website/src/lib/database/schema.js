import { relations } from "drizzle-orm";
import { pgTable, pgEnum, bigint, integer, text, boolean, timestamp, unique, interval, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";

export const lifecyclesEnum = pgEnum("lifecycles", ["active", "inactive", "deleted"]);

export const publishStatusesEnum = pgEnum("publish_statuses", ["draft", "pending", "reviewed", "published"]);

const columns = {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active").notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  author_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // TODO(vxern): Convert this to database-level `on update CURRENT_TIMESTAMP` when supported.
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
};
const publishStatus = { created_at: timestamp({ withTimezone: true }).defaultNow().notNull() };
const defaultColumns = {
  id: columns.id,
  lifecycle: columns.lifecycle,
  created_at: columns.created_at,
  updated_at: columns.updated_at,
};

export const versions = pgTable("versions", {
  id: columns.id,
  version: integer().default(1).notNull(),
  versionable_type: text().notNull(),
  versionable_id: bigint({ mode: "number" }).notNull(),
  author_id: columns.author_id,
  // Should be equal to the `created_at` of the `versionable` in the first version.
  // Should be equal to the `updated_at` of the `versionable` in the last version.
  created_at: columns.created_at,
}, (t) => [unique().on(t.version, t.versionable_type, t.versionable_id)]);

export const versionsRelations = relations(versions, ({ many, one }) => ({
  author: one(users, { fields: [versions.author_id], references: [users.id] }),
  reviews: many(reviews),
}));

export const licencesEnum = pgEnum("licences", ["proprietary", "granted", "public"]);

export const orthographiesEnum = pgEnum("orthographies", [
  "slabikorz",
  "steuer",
  "phonetic",
  "wencel",
  "kosmala",
  "wiora",
  "polish",
  "czech",
  "german",
  "other",
]);

export const languagesEnum = pgEnum("languages", [
  "szl",
  "pl",
  "cs",
  "sk",
  "de",
  "en-GB",
]);

export const accessesEnum = pgEnum("accesses", ["closed", "limited", "open"]);

export const sources = pgTable("sources", {
  ...defaultColumns,
  name: text().notNull(),
  description: text(),
  url: text(),
  year: text(),
  licence: licencesEnum().notNull(),
  orthography: orthographiesEnum().notNull(),
  source_language: languagesEnum().notNull(),
  target_language: languagesEnum().notNull(),
  access: accessesEnum().notNull(),
  redistributable: boolean().default(false).notNull(),
  imported_entry_count: integer().default(0).notNull(),
  total_entry_count: integer(),
  status: columns.status,
  author_id: columns.author_id,
});

export const sourcesRelations = relations(sources, ({ many, one }) => ({
  entries: many(entries),
  authors: many(authorsToSources),
  author: one(users, { fields: [sources.author_id], references: [users.id] }),
}));

export const authors = pgTable("authors", {
  ...defaultColumns,
  name: text().notNull(),
  status: columns.status,
  author_id: columns.author_id
});

export const authorsRelations = relations(authors, ({ many }) => ({
  sources: many(authorsToSources),
  locations: many(authorsToLocations),
}));

export const authorsToLocations = pgTable("authors_to_locations", {
  author_id: bigint({ mode: "number" }).references(() => authors.id).notNull(),
  location_id: bigint({ mode: "number" }).references(() => locations.id).notNull(),
}, (t) => [primaryKey({ columns: [t.author_id, t.location_id] })]);

export const authorsToLocationsRelations = relations(authorsToLocations, ({ one }) => ({
  author: one(authors, { fields: [authorsToLocations.author_id], references: [authors.id] }),
  location: one(locations, { fields: [authorsToLocations.location_id], references: [locations.id] }),
}));

export const authorsToSources = pgTable("authors_to_sources", {
  author_id: bigint({ mode: "number" }).references(() => authors.id).notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id).notNull(),
}, (t) => [primaryKey({ columns: [t.author_id, t.source_id] })]);

export const authorsToSourcesRelations = relations(authorsToSources, ({ one }) => ({
  author: one(authors, { fields: [authorsToSources.author_id], references: [authors.id] }),
  source: one(sources, { fields: [authorsToSources.source_id], references: [sources.id] }),
}));

export const locations = pgTable("locations", {
  ...defaultColumns,
  name: text().notNull(),
  status: columns.status,
  author_id: columns.author_id,
});

export const locationsRelations = relations(locations, ({ many }) => ({
  authors: many(authorsToLocations),
}));

export const entries = pgTable("entries", {
  ...defaultColumns,
  lemma: text().notNull(),
  // TODO(vxern): Add lexemes.
  contents: text().notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id).notNull(),
  status: columns.status,
  author_id: columns.author_id,
});

export const entriesRelations = relations(entries, ({ one, many }) => ({
  source: one(sources, { fields: [entries.source_id], references: [sources.id] }),
  author: one(users, { fields: [entries.author_id], references: [users.id] }),
  categories: many(entriesToCategories),
}));

export const entriesToCategories = pgTable("entries_to_categories", {
  entry_id: bigint({ mode: "number" }).references(() => entries.id).notNull(),
  category_id: bigint({ mode: "number" }).references(() => categories.id).notNull(),
}, (t) => [primaryKey({ columns: [t.entry_id, t.category_id] })]);

export const entriesToCategoriesRelations = relations(entriesToCategories, ({ one }) => ({
  entry: one(entries, { fields: [entriesToCategories.entry_id], references: [entries.id] }),
  category: one(categories, { fields: [entriesToCategories.category_id], references: [categories.id] }),
}));

export const coloursEnum = pgEnum("colours", [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
]);

export const categories = pgTable("categories", {
  ...defaultColumns,
  name: text().notNull(),
  description: text(),
  colour: coloursEnum().notNull(),
  status: columns.status,
  author_id: columns.author_id,
});

export const categoriesRelations = relations(categories, ({ one }) => ({
  author: one(users, { fields: [categories.author_id], references: [users.id] })
}));

export const users = pgTable("users", {
  ...defaultColumns,
  username: text().notNull(),
  email_address: text().notNull(),
  searches_count: integer().default(0).notNull(),
  additions_count: integer().default(0).notNull(),
  changes_count: integer().default(0).notNull(),
  reviews_count: integer().default(0).notNull(),
  // In milliseconds.
  time_spent_using: integer().default(0).notNull(),
  // In milliseconds.
  time_spent_editing: integer().default(0).notNull(),
}, (t) => [unique().on(t.email_address)]);

export const usersRelations = relations(users, ({ many }) => ({
  // A user can in fact only have one set of settings.
  settings: many(settings),
  versions: many(versions),
  reviews: many(reviews),
  searches: many(searches),
  sources: many(sources),
  entries: many(entries),
  categories: many(categories),
  timeEntries: many(timeEntries),
}));

export const themesEnum = pgEnum("themes", ["dark"])

export const settings = pgTable("settings", {
  id: columns.id,
  user_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  updated_at: columns.updated_at,
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

export const settingsToSources = pgTable("settings_to_sources", {
  settings_id: bigint({ mode: "number" }).references(() => settings.id).notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id).notNull(),
}, (t) => [primaryKey({ columns: [t.settings_id, t.source_id] })]);

export const settingsToSourcesRelations = relations(settingsToSources, ({ one }) => ({
  settings: one(settings, { fields: [settingsToSources.settings_id], references: [settings.id] }),
  source: one(sources, { fields: [settingsToSources.source_id], references: [sources.id] }),
}));

export const settingsToCategories = pgTable("settings_to_categories", {
  settings_id: bigint({ mode: "number" }).references(() => settings.id).notNull(),
  category_id: bigint({ mode: "number" }).references(() => categories.id).notNull(),
}, (t) => [primaryKey({ columns: [t.settings_id, t.category_id] })]);

export const settingsToCategoriesRelations = relations(settingsToCategories, ({ one }) => ({
  settings: one(settings, { fields: [settingsToCategories.settings_id], references: [settings.id] }),
  category: one(categories, { fields: [settingsToCategories.category_id], references: [categories.id] }),
}));

export const timeEntryScopesEnum = pgEnum("time_entry_scopes", [
  "using",
  "editing",
]);

export const timeEntries = pgTable("time_entries", {
  id: columns.id,
  user_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  scope: timeEntryScopesEnum().notNull(),
  created_at: columns.created_at,
  // No updated_at because time entries are never updated.
});

export const timeEntriesRelations = relations(timeEntries, ({ one }) => ({
  user: one(users, { fields: [timeEntries.user_id], references: [users.id] }),
}))

export const reviewDecisionsEnum = pgEnum("review_decisions", ["accepted", "rejected"]);

export const reviews = pgTable("reviews", {
  id: columns.id,
  version_id: bigint({ mode: "number" }).references(() => versions.id).notNull(),
  reviewer_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  decision: reviewDecisionsEnum().notNull(),
  comment: text(),
  created_at: columns.created_at,
  // No updated_at because reviews are never updated.
}, (t) => [uniqueIndex().on(t.version_id, t.reviewer_id)])

export const reviewsRelations = relations(reviews, ({ one }) => ({
  version: one(versions, { fields: [reviews.version_id], references: [versions.id] }),
  reviewer: one(users, { fields: [reviews.reviewer_id], references: [users.id] }),
}));

export const searches = pgTable("searches", {
  id: columns.id,
  searcher_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  lemma: text().notNull(),
  created_at: columns.created_at,
});

export const searchesRelations = relations(searches, ({ one }) => ({
  searcher: one(users, { fields: [searches.searcher_id], references: [users.id] }),
}));

export const searchFrequencies = pgTable("search_frequencies", {
  id: columns.id,
  lemma: text().notNull(),
  count: integer().default(0).notNull(),
  created_at: columns.created_at, // Date of the first search for this word.
  updated_at: columns.updated_at, // Date of the latest search for this word.
}, (t) => [unique().on(t.lemma)]);
