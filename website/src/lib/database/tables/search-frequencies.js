import { relations } from "drizzle-orm";
import { pgTable, bigint, integer, text, timestamp, unique } from "drizzle-orm/pg-core";

export const searchFrequencies = pgTable("search_frequencies", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lemma: text().notNull(),
  count: integer().default(0).notNull(),
  // Date of the first search for this word.
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // Date of the latest search for this word.
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
}, (t) => [unique().on(t.lemma)]);
