import { relations } from "drizzle-orm";
import { pgTable, bigint, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { lifecyclesEnum } from "../enums/lifecycles";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { coloursEnum } from "../enums/colours";
import { users } from "./users";

export const categories = pgTable("categories", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active").notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  name: text().notNull(),
  description: text(),
  colour: coloursEnum().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  author_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
});

export const categoriesRelations = relations(categories, ({ one }) => ({
  author: one(users, { fields: [categories.author_id], references: [users.id] })
}));

export const categoriesInsertSchema = createInsertSchema(categories);
