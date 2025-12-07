import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, text, integer, timestamp, check, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { coloursEnum } from "../enums/colours";
import { users } from "./users";

export const categories = pgTable("categories", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  name: text().notNull(),
  description: text(),
  colour: coloursEnum().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  version: integer().default(1).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const categoriesInsertSchema = createInsertSchema(categories, {
  name: (z) => z.nonempty(),
});

export const categoriesUpdateSchema = createUpdateSchema(categories, {
  name: (z) => z.nonempty(),
});
