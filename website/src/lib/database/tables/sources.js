import { relations, sql } from "drizzle-orm";
import { pgTable, integer, bigint, text, boolean, timestamp, check, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
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
  deleted: boolean().default(false).notNull(),
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
  version: integer().default(1).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  check("description_not_empty_check", sql`${t.description} IS NULL OR ${t.description} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const sourcesRelations = relations(sources, ({ many, one }) => ({
  entries: many(entries),
  authors: many(authorsToSources),
}));

export const sourcesInsertSchema = createInsertSchema(sources, {
  name: (z) => z.nonempty(),
  description: (z) => z.nonempty(),
});

export const sourcesUpdateSchema = createUpdateSchema(sources, {
  lemma: (z) => z.nonempty(),
});
