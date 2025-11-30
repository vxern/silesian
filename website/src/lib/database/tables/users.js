import { relations } from "drizzle-orm";
import { pgTable, bigint, integer, text, timestamp, unique } from "drizzle-orm/pg-core";
import { lifecyclesEnum } from "../enums/lifecycles";
import { settings } from "./settings";
import { versions } from "./versions";
import { reviews } from "./reviews";
import { searches } from "./searches";
import { sources } from "./sources";
import { entries } from "./entries";
import { categories } from "./categories";
import { timeEntries } from "./time-entries";

export const users = pgTable("users", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active").notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  username: text().notNull(),
  email_address: text().notNull(),
  searches_count: integer().default(0).notNull(),
  additions_count: integer().default(0).notNull(),
  changes_count: integer().default(0).notNull(),
  reviews_count: integer().default(0).notNull(),
  // In milliseconds.
  time_spent_using: integer().default(0).notNull(),
  // In milliseconds.
  time_spent_editing: integer().default(0).notNull(),
}, (t) => [unique().on(t.email_address)]);

export const usersRelations = relations(users, ({ many }) => ({
  // A user can in fact only have one set of settings.
  settings: many(settings),
  versions: many(versions),
  reviews: many(reviews),
  searches: many(searches),
  sources: many(sources),
  entries: many(entries),
  categories: many(categories),
  timeEntries: many(timeEntries),
}));
