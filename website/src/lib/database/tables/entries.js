import { relations } from "drizzle-orm";
import { pgTable, bigint, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { entriesToCategories } from "./entries-to-categories";
import { lifecyclesEnum } from "../enums/lifecycles";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { sources } from "./sources";
import { users } from "./users";

export const entries = pgTable("entries", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active").notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  lemma: text().notNull(),
  // TODO(vxern): Add lexemes.
  contents: text().notNull(),
  source_id: bigint({ mode: "number" }).references(() => sources.id).notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  author_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
});

export const entriesRelations = relations(entries, ({ one, many }) => ({
  source: one(sources, { fields: [entries.source_id], references: [sources.id] }),
  author: one(users, { fields: [entries.author_id], references: [users.id] }),
  categories: many(entriesToCategories),
}));

export const entriesInsertSchema = createInsertSchema(entries);
