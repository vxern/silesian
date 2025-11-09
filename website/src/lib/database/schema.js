import { relations } from "drizzle-orm";
import { pgTable, pgEnum, bigint, text, boolean, timestamp, unique } from "drizzle-orm/pg-core";

export const lifecyclesEnum = pgEnum("lifecycles", ["active", "inactive", "deleted"]);

const defaultColumns = {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active"),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // TODO(vxern): Convert this to database-level `on update CURRENT_TIMESTAMP`.
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
};

export const changes = pgTable("changes", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  object_type: text().notNull(),
  object_id: bigint({ mode: "number" }).notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

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

export const publishStatusesEnum = pgEnum("entry_statuses", ["draft", "pending", "reviewed", "published"]);

export const sources = pgTable("sources", {
  ...defaultColumns,
  name: text().notNull(),
  url: text().notNull(),
  authors: text().array().notNull(),
  licence: licencesEnum().notNull(),
  orthography: orthographiesEnum().notNull(),
  source_language: languagesEnum().notNull(),
  target_language: languagesEnum().notNull(),
  access: accessesEnum().notNull(),
  redistributable: boolean().notNull(),
  imported_entry_count: bigint({ mode: "number" }).default(0).notNull(),
  total_entry_count: bigint({ mode: "number" }).notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
});

export const entries = pgTable("entries", {
  ...defaultColumns,
  lemma: text().notNull(),
  // TODO(vxern): Add lexemes.
  contents: text().notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id).notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
});

export const sourcesRelations = relations(sources, ({ many }) => ({
  entries: many(entries),
}));

export const entriesToCategories = pgTable("entry_categories", {
  entry_id: bigint({ mode: "number" }).references(() => entries.id).notNull(),
  category_id: bigint({ mode: "number" }).references(() => categories.id).notNull(),
});

export const categories = pgTable("categories", {
  ...defaultColumns,
  name: text().notNull(),
});

// TODO(vxern): Add relation between entries and categories.
// TODO(vxern): Add relation between categories and entries.

export const users = pgTable("users", {
  ...defaultColumns,
  username: text().notNull(),
  email_address: text().notNull(),
});

// TODO(vxern): Add relation between entries and users.
// TODO(vxern): Add relation between users and entries.

// TODO(vxern): Maybe reviews instead of reviewers?
export const reviewersToEntries = pgTable("entry_reviewers", {
  user_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  entry_id: bigint({ mode: "number" }).references(() => entries.id).notNull(),
}, (t) => [unique().on(t.user_id, t.entry_id)]);
