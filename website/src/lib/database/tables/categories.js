import { defineRelationsPart, sql } from "drizzle-orm";
import { pgTable, bigint, text, integer, timestamp, check, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { coloursEnum } from "../enums/colours";
import { users } from "./users";
import { entriesToCategories } from "./entries-to-categories";
import * as schema from "../schema";

export const categories = pgTable("categories", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  name: text().notNull(),
  description: text(),
  colour: coloursEnum().notNull(),
  status: publishStatusesEnum().default("draft").notNull(),
  current_version: integer().default(1).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  check("description_not_empty_check", sql`${t.description} IS NULL OR ${t.description} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const categoriesRelations = () => defineRelationsPart(schema, (r) => ({
  categories: {
    version: r.one.versions({
      from: [r.categories.id, r.categories.current_version],
      to: [r.versions.versionable_id, r.versions.version],
      where: {
        versionable_type: "categories",
      },
    }),
    entries: r.many.entries({
      from: r.categories.id.through(r.entriesToCategories.category_id),
      to: r.entries.id.through(r.entriesToCategories.entry_id),
    }),
    settings: r.many.settings({
      from: r.categories.id.through(r.settingsToCategories.category_id),
      to: r.settings.id.through(r.settingsToCategories.settings_id),
    }),
  },
}));

export const categoriesInsertSchema = createInsertSchema(categories, {
  name: (z) => z.nonempty(),
});

export const categoriesUpdateSchema = createUpdateSchema(categories, {
  name: (z) => z.nonempty(),
});
