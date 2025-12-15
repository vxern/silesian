import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, text, integer, timestamp, check, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { users } from "./users";
import { authorsToEntries } from "./authors-to-entries";
import { authorsToLocations } from "./authors-to-locations";
import { authorsToSources } from "./authors-to-sources";

export const authors = pgTable("authors", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  name: text().notNull(),
  description: text(),
  status: publishStatusesEnum().default("draft").notNull(),
  version: integer().default(1).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  check("description_not_empty_check", sql`${t.description} IS NULL OR ${t.description} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const authorsRelations = relations(authors, ({ many }) => ({
  entries: many(authorsToEntries),
  sources: many(authorsToSources),
  locations: many(authorsToLocations),
}));

export const authorsInsertSchema = createInsertSchema(authors, {
  name: (z) => z.nonempty(),
});

export const authorsUpdateSchema = createUpdateSchema(authors, {
  name: (z) => z.nonempty(),
});
