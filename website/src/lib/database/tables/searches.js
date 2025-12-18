import { defineRelationsPart, sql } from "drizzle-orm";
import { pgTable, bigint, text, timestamp, check } from "drizzle-orm/pg-core";
import { users } from "./users";
import * as schema from "../schema";

export const searches = pgTable("searches", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  searcher_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
  lemma: text().notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  check("lemma_not_empty_check", sql`${t.lemma} <> ''`),
]);

export const searchesRelations = defineRelationsPart(schema, (r) => ({
  searches: {
    searcher: r.one.users({
      from: r.reviews.searcher_id,
      to: r.users.id,
    }),
  },
}));
