import * as z from "zod";
import { defineRelationsPart, sql } from "drizzle-orm";
import { pgTable, bigint, text, integer, timestamp, check, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { countriesEnum } from "../enums/countries";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { authorsToLocations } from "./authors-to-locations";
import { sources } from "./sources";
import { users } from "./users";
import * as schema from "../schema";

export const locations = pgTable("locations", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  name: text().notNull(),
  description: text(),
  country: countriesEnum().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  current_version: integer().default(1).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  check("description_not_empty_check", sql`${t.description} IS NULL OR ${t.description} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const locationsRelations = () => defineRelationsPart(schema, (r) => ({
  locations: {
    version: r.one.versions({
      from: [r.locations.id, r.locations.current_version],
      to: [r.versions.versionable_id, r.versions.version],
      where: {
        versionable_type: "locations",
      },
    }),
    authors: r.many.authors({
      from: r.locations.id.through(r.authorsToLocations.location_id),
      to: r.authors.id.through(r.authorsToLocations.author_id),
    }),
  },
}));

export const locationsInsertSchema = createInsertSchema(locations, {
  name: (z) => z.nonempty(),
});

export const locationsUpdateSchema = createUpdateSchema(locations, {
  name: (z) => z.nonempty(),
});
