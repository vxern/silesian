import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, text, timestamp, check, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { coloursEnum } from "../enums/colours";
import { users } from "./users";

export const categories = pgTable("categories", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  deleted_at: timestamp({ withTimezone: true }),
  name: text().notNull(),
  description: text(),
  colour: coloursEnum().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  author_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  check("deleted_timestamp_provided_check", sql`NOT deleted OR ${t.deleted_at} IS NOT NULL`),
]);

export const categoriesRelations = relations(categories, ({ one }) => ({
  author: one(users, { fields: [categories.author_id], references: [users.id] })
}));

export const categoriesInsertSchema = createInsertSchema(categories);
