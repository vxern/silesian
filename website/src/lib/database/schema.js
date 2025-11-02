import { relations } from "drizzle-orm";
import { pgTable, pgEnum, bigint, text, boolean, timestamp, unique } from "drizzle-orm/pg-core";

export const lifecyclesEnum = pgEnum("lifecycles", ["active", "inactive", "deleted"]);

const defaultColumns = {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active"),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
};

export const orthographies = pgTable("orthographies", {
  ...defaultColumns,
  name: text().notNull(),
});

export const orthographiesRelations = relations(orthographies, ({ many }) => ({
  entries: many(entries),
}));

export const licences = pgTable("licences", {
  ...defaultColumns,
  name: text().notNull(),
});

export const licencesRelations = relations(licences, ({ many }) => ({
  sources: many(sources),
  entries: many(entries),
}));

export const accessesEnum = pgEnum("accesses", ["closed", "limited", "open", "unknown"]);

export const sources = pgTable("sources", {
  ...defaultColumns,
  name: text().notNull(),
  link: text().notNull(),
  isbn: bigint({ mode: "number" }),
  authors: text().array().notNull(),
  licence_id: bigint({ mode: "number" }).references(() => licences.id).notNull(),
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
  licence_id: bigint({ mode: "number" }).references(() => licences.id).notNull(),
  orthography_id: bigint({ mode: "number" }).references(() => orthographies.id).notNull(),
  source_language: text().notNull(),
  target_language: text().notNull(),
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
