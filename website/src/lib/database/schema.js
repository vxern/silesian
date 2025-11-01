import { relations } from "drizzle-orm";
import { pgTable, pgEnum, bigint, text, boolean } from "drizzle-orm/pg-core";

const defaultColumns = {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active"),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
};

export const lifecyclesEnum = pgEnum("lifecycles", ["active", "inactive", "deleted"]);

export const orthographies = pgTable("orthographies", {
  ...defaultColumns,
  name: text().notNull(),
});

export const orthographiesRelations = relations(orthographies, ({ many }) => ({
  words: many(words),
}));

export const licences = pgTable("licences", {
  ...defaultColumns,
  name: text().notNull(),
});

export const licencesRelations = relations(licences, ({ many }) => ({
  sources: many(sources),
  words: many(words),
}));

export const accessesEnum = pgEnum("accesses", ["closed", "limited", "open", "unknown"]);

export const sources = pgTable("sources", {
  ...defaultColumns,
  name: text().notNull(),
  link: text().notNull(),
  authors: text().array().notNull(),
  licenceId: bigint({ mode: "number" }).references(() => licences.id).notNull(),
  access: accessesEnum().notNull(),
  redistributable: boolean().notNull(),
  importedCount: bigint({ mode: "number" }).notNull(),
  totalCount: bigint({ mode: "number" }).notNull(),
});

export const sourcesRelations = relations(sources, ({ many }) => ({
  words: many(words),
}));

export const publishStatusesEnum = pgEnum("entry-statuses", ["draft", "pending", "reviewed", "published"]);

export const entries = pgTable("entries", {
  ...defaultColumns,
  word: text().notNull(),
  sourceId: bigint({ mode: "number" }).references(() => sources.id).notNull(),
  licenceId: bigint({ mode: "number" }).references(() => licences.id).notNull(),
  orthographyId: bigint({ mode: "number" }).references(() => orthographies.id).notNull(),
  sourceLanguage: text().notNull(),
  targetLanguage: text().notNull(),
});

// TODO(vxern): Add relation between entries and users.

export const users = pgTable("users", {
  ...defaultColumns,
  username: text().notNull(),
  emailAddress: text().notNull(),
});

// TODO(vxern): Add relation between users and entries.

export const reviewersToEntries = pgTable("entry_reviewers", {
  userId: bigint({ mode: "number" }).notNull().references(() => users.id),
  entryId: bigint({ mode: "number" }).notNull().references(() => entries.id),
});
