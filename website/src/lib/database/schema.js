import { relations } from "drizzle-orm";
import { pgTable, pgEnum, bigint, integer, text, boolean, timestamp, unique, interval } from "drizzle-orm/pg-core";

export const lifecyclesEnum = pgEnum("lifecycles", ["active", "inactive", "deleted"]);

export const publishStatusesEnum = pgEnum("publish_statuses", ["draft", "pending", "reviewed", "published"]);

const columns = {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active"),
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

// TODO(vxern): Rename to versions?
export const changes = pgTable("changes", {
  id: columns.id,
  version: integer().default(1).notNull(),
  changeable_type: text().notNull(),
  changeable_id: bigint({ mode: "number" }).notNull(),
  changer_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  created_at: columns.created_at,
}, (t) => [unique().on(t.version, t.changeable_type, t.changeable_id)]);

export const changesRelations = relations(changes, ({ many, one }) => ({
  changer: one(users, { fields: [changes.changer_id], references: [users.id] }),
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
  "en",
]);

export const accessesEnum = pgEnum("accesses", ["closed", "limited", "open"]);

export const sources = pgTable("sources", {
  ...defaultColumns,
  name: text().notNull(),
  url: text(),
  authors: text().array(),
  year: text(),
  licence: licencesEnum().notNull(),
  orthography: orthographiesEnum().notNull(),
  source_language: languagesEnum().notNull(),
  target_language: languagesEnum().notNull(),
  access: accessesEnum().notNull(),
  redistributable: boolean().notNull(),
  imported_entry_count: integer().default(0).notNull(),
  total_entry_count: integer(),
  status: columns.status,
  author_id: columns.author_id,
});

export const sourcesRelations = relations(sources, ({ many, one }) => ({
  entries: many(entries),
  author: one(users, { fields: [sources.author_id], references: [users.id] }),
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
  reviews: many(reviews),
  entriesToCategories: many(entriesToCategories),
}));

export const entriesToCategories = pgTable("entries_to_categories", {
  entry_id: bigint({ mode: "number" }).references(() => entries.id).notNull(),
  category_id: bigint({ mode: "number" }).references(() => categories.id).notNull(),
}, (t) => [unique().on(t.entry_id, t.category_id)]);

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
  changes: many(changes),
  reviews: many(reviews),
  searches: many(searches),
  sources: many(sources),
  entries: many(entries),
  categories: many(categories),
  timeEntries: many(timeEntries),
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
  change_id: bigint({ mode: "number" }).references(() => changes.id).notNull(),
  reviewer_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  decision: reviewDecisionsEnum().notNull(),
  comments: text().array(),
  created_at: columns.created_at,
  // No updated_at because reviews are never updated.
}, (t) => [unique().on(t.change_id, t.reviewer_id)])

export const reviewsRelations = relations(reviews, ({ one }) => ({
  change: one(changes, { fields: [reviews.change_id], references: [changes.id] }),
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
