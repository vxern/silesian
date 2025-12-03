import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, text, timestamp, check, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { users } from "./users";
import { authorsToLocations } from "./authors-to-locations";
import { authorsToSources } from "./authors-to-sources";

export const authors = pgTable("authors", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  deleted_at: timestamp({ withTimezone: true }),
  name: text().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  author_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  check("deleted_timestamp_provided_check", sql`NOT deleted OR ${t.deleted_at} IS NOT NULL`),
]);

export const authorsRelations = relations(authors, ({ many }) => ({
  sources: many(authorsToSources),
  locations: many(authorsToLocations),
}));

export const authorsInsertSchema = createInsertSchema(authors, {
  name: (z) => z.nonempty(),
});
