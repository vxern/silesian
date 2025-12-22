import { defineRelationsPart, sql } from "drizzle-orm";
import { pgTable, bigint, integer, text, timestamp, unique, check } from "drizzle-orm/pg-core";
import * as schema from "../schema";

export const searchFrequencies = pgTable("search_frequencies", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lemma: text().notNull(),
  count: integer().default(0).notNull(),
  first_searched_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  most_recently_searched_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  unique().on(t.lemma),
  check("lemma_not_empty_check", sql`${t.lemma} <> ''`),
]);

export const searchFrequenciesRelations = () => defineRelationsPart(schema, (r) => ({
  searchFrequencies: {},
}));
