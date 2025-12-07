import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, integer, text, timestamp, unique, check, boolean, index } from "drizzle-orm/pg-core";
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
  deleted: boolean().default(false).notNull(),
  username: text().notNull(),
  email_address: text().notNull(),
  // TODO(vxern): Move these elsewhere because they're going to be reflected in version snapshots otherwise.
  searches_count: integer().default(0).notNull(),
  additions_count: integer().default(0).notNull(),
  changes_count: integer().default(0).notNull(),
  reviews_count: integer().default(0).notNull(),
  // In milliseconds.
  time_spent_using: integer().default(0).notNull(),
  // In milliseconds.
  time_spent_editing: integer().default(0).notNull(),
  version: integer().default(1).notNull(),
}, (t) => [
  unique().on(t.username),
  unique().on(t.email_address),
  check("username_not_empty_check", sql`${t.username} <> ''`),
  check("email_address_not_empty_check", sql`${t.email_address} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
]);

export const usersRelations = relations(users, ({ many }) => ({
  // A user can in fact only have one set of settings.
  settings: many(settings),
  versions: many(versions),
  reviews: many(reviews),
  searches: many(searches),
  timeEntries: many(timeEntries),
}));
