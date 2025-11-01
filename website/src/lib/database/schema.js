import { relations } from "drizzle-orm";
import { pgTable, pgEnum, bigint, text, boolean } from "drizzle-orm/pg-core";

export const orthographies = pgTable("orthographies", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
});

export const orthographiesRelations = relations(orthographies, ({ many }) => ({
  words: many(words),
}));

export const licences = pgTable("licences", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
});

export const licencesRelations = relations(licences, ({ many }) => ({
  sources: many(sources),
  words: many(words),
}));

export const accessesEnum = pgEnum("accesses", ["closed", "limited", "open"]);

export const sources = pgTable("sources", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
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

export const words = pgTable("words", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  word: text().notNull(),
  sourceId: bigint({ mode: "number" }).references(() => sources.id).notNull(),
  licenceId: bigint({ mode: "number" }).references(() => licences.id).notNull(),
  orthographyId: bigint({ mode: "number" }).references(() => orthographies.id).notNull(),
  sourceLanguage: text().notNull(),
  targetLanguage: text().notNull(),
});