import * as z from "zod";
import { relations, sql } from "drizzle-orm";
import { pgTable, bigint, text, integer, timestamp, check, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { authorsToLocations } from "./authors-to-locations";
import { sources } from "./sources";
import { users } from "./users";

export const locations = pgTable("locations", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  name: text().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  version: integer().default(1).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
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
