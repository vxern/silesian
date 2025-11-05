import { relations } from "drizzle-orm";
import { pgTable, pgEnum, bigint, text, boolean, timestamp, unique } from "drizzle-orm/pg-core";

export const lifecyclesEnum = pgEnum("lifecycles", ["active", "inactive", "deleted"]);

const defaultColumns = {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active"),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
};

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
  link: text().notNull(),
  authors: text().array().notNull(),
  licence: licencesEnum().notNull(),
  orthography: orthographiesEnum().notNull(),
  source_language: languagesEnum().notNull(),
  target_language: languagesEnum().notNull(),
  access: accessesEnum().notNull(),
  redistributable: boolean().notNull(),
  imported_count: bigint({ mode: "number" }).default(0).notNull(),
  total_count: bigint({ mode: "number" }).notNull(),
});

export const sourcesRelations = relations(sources, ({ many }) => ({
  entries: many(entries),
}));

export const publishStatusesEnum = pgEnum("entry_statuses", ["draft", "pending", "reviewed", "published"]);

export const entries = pgTable("entries", {
  ...defaultColumns,
  lemma: text().notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id).notNull(),
  licence_override: licencesEnum(),
  orthography_override: orthographiesEnum(),
  source_language_override: languagesEnum(),
  target_language_override: languagesEnum(),
  status: publishStatusesEnum().default("draft").notNull(),
});

// TODO(vxern): Add relation between entries and users.

export const users = pgTable("users", {
  ...defaultColumns,
  username: text().notNull(),
  email_address: text().notNull(),
});

// TODO(vxern): Add relation between users and entries.

export const reviewersToEntries = pgTable("entry_reviewers", {
  user_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
  entry_id: bigint({ mode: "number" }).references(() => entries.id).notNull(),
}, (t) => [unique().on(t.user_id, t.entry_id)]);
