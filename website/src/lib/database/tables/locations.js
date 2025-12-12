import * as z from "zod";
import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, text, integer, timestamp, check, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { countriesEnum } from "../enums/countries";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { authorsToLocations } from "./authors-to-locations";
import { sources } from "./sources";
import { users } from "./users";

export const locations = pgTable("locations", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  name: text().notNull(),
  description: text(),
  country: countriesEnum().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  version: integer().default(1).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  check("description_not_empty_check", sql`${t.description} IS NULL OR ${t.description} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const locationsRelations = relations(locations, ({ many }) => ({
  authors: many(authorsToLocations),
}));

export const locationsInsertSchema = createInsertSchema(locations, {
  name: (z) => z.nonempty(),
});

export const locationsUpdateSchema = createUpdateSchema(locations, {
  name: (z) => z.nonempty(),
});
