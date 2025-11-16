import { relations } from "drizzle-orm";
import { pgTable, pgEnum, bigint, integer, text, boolean, timestamp, unique, interval } from "drizzle-orm/pg-core";

export const lifecyclesEnum = pgEnum("lifecycles", ["active", "inactive", "deleted"]);

export const publishStatusesEnum = pgEnum("publish_statuses", ["draft", "pending", "reviewed", "published"]);

const columns = {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active"),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // TODO(vxern): Convert this to database-level `on update CURRENT_TIMESTAMP` when supported.
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
  status: publishStatusesEnum().default("draft").notNull(),
};
const publishStatus = { created_at: timestamp({ withTimezone: true }).defaultNow().notNull() };
const defaultColumns = {
  id: columns.id,
  lifecycle: columns.lifecycle,
  created_at: columns.created_at,
  updated_at: columns.updated_at,
};

export const changes = pgTable("changes", {
  id: columns.id,
  version: integer().default(1).notNull(),
  changeable_type: text().notNull(),
  changeable_id: bigint({ mode: "number" }).notNull(),
  created_at: columns.created_at,
}, (t) => [unique().on(t.version, t.changeable_type, t.changeable_id)]);

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
});

export const entries = pgTable("entries", {
  ...defaultColumns,
  lemma: text().notNull(),
  // TODO(vxern): Add lexemes.
  contents: text().notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id).notNull(),
  status: columns.status,
});

export const sourcesRelations = relations(sources, ({ many }) => ({
  entries: many(entries),
}));

export const entriesToCategories = pgTable("entry_categories", {
  entry_id: bigint({ mode: "number" }).references(() => entries.id).notNull(),
  category_id: bigint({ mode: "number" }).references(() => categories.id).notNull(),
});

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
});

// TODO(vxern): Add relation between entries and categories.
// TODO(vxern): Add relation between categories and entries.

export const users = pgTable("users", {
  ...defaultColumns,
  username: text().notNull(),
  email_address: text().notNull(),
  searches_count: integer().default(0).notNull(),
  additions_count: integer().default(0).notNull(),
  changes_count: integer().default(0).notNull(),
  time_spent_using: interval().default("0").notNull(),
  time_spent_editing: interval().default("0").notNull(),
});

export const reviews = pgTable("reviews", {
  id: columns.id,
  change_id: bigint({ mode: "number" }).references(() => changes.id).notNull(),
  reviewer_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  comments: text().array(),
  created_at: columns.created_at,
})

// TODO(vxern): Add relation between reviewers and reviews.
// TODO(vxern): Add relation between reviews and reviewers.

export const reviewersToReviews = pgTable("reviewers_to_reviews", {
  reviewer_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  review_id: bigint({ mode: "number" }).references(() => reviews.id).notNull(),
}, (t) => [unique().on(t.reviewer_id, t.review_id)]);

export const searches = pgTable("searches", {
  id: columns.id,
  searcher_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  query: text().notNull(),
  created_at: columns.created_at,
});
