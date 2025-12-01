import { relations, sql } from "drizzle-orm";
import { pgTable, integer, bigint, text, boolean, timestamp, check } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { lifecyclesEnum } from "../enums/lifecycles";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { licencesEnum } from "../enums/licences";
import { orthographiesEnum } from "../enums/orthographies";
import { languagesEnum } from "../enums/languages";
import { accessesEnum } from "../enums/accesses";
import { entries } from "./entries";
import { authorsToSources } from "./authors-to-sources";
import { users } from "./users";

export const sources = pgTable("sources", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active").notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  name: text().notNull(),
  description: text(),
  url: text(),
  year: text(),
  licence: licencesEnum().notNull(),
  orthography: orthographiesEnum().notNull(),
  source_language: languagesEnum().notNull(),
  target_language: languagesEnum().notNull(),
  access: accessesEnum().notNull(),
  redistributable: boolean().default(false).notNull(),
  imported_entry_count: integer().default(0).notNull(),
  total_entry_count: integer(),
  status: publishStatusesEnum().default("draft").notNull(),
  author_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
}, (t) => [
  check("name_empty_check", sql`${t.name} <> ''`),
  check("description_empty_check", sql`${t.description} IS NULL OR ${t.description} <> ''`),
]);

export const sourcesRelations = relations(sources, ({ many, one }) => ({
  entries: many(entries),
  authors: many(authorsToSources),
  author: one(users, { fields: [sources.author_id], references: [users.id] }),
}));

export const sourcesInsertSchema = createInsertSchema(sources);
