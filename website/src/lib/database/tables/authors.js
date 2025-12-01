import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, text, timestamp, check } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { lifecyclesEnum } from "../enums/lifecycles";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { users } from "./users";
import { authorsToLocations } from "./authors-to-locations";
import { authorsToSources } from "./authors-to-sources";

export const authors = pgTable("authors", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active").notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  name: text().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  author_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
}, (t) => [
  check("name_empty_check", sql`${t.name} <> ''`),
]);

export const authorsRelations = relations(authors, ({ many }) => ({
  sources: many(authorsToSources),
  locations: many(authorsToLocations),
}));

export const authorsInsertSchema = createInsertSchema(authors, {});
