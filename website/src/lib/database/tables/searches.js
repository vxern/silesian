import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, text, timestamp, check } from "drizzle-orm/pg-core";
import { users } from "./users";

export const searches = pgTable("searches", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  searcher_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
  lemma: text().notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // No updated_at because searches are never updated.
}, (t) => [
  check("lemma_not_empty_check", sql`${t.lemma} <> ''`),
]);

export const searchesRelations = relations(searches, ({ one }) => ({
  searcher: one(users, { fields: [searches.searcher_id], references: [users.id] }),
}));
