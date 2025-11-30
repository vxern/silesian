import { relations } from "drizzle-orm";
import { pgTable, bigint, text, timestamp } from "drizzle-orm/pg-core";
import { lifecyclesEnum } from "../enums/lifecycles";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { entriesToCategories } from "./entries-to-categories";
import { sources } from "./sources";
import { users } from "./users";

export const locations = pgTable("locations", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  lifecycle: lifecyclesEnum().default("active").notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  name: text().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  author_id: bigint({ mode: "number" }).references(() => users.id).notNull(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  authors: many(authorsToLocations),
}));
