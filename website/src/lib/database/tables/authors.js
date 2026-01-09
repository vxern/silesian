import { defineRelationsPart, sql } from "drizzle-orm";
import { pgTable, bigint, text, integer, timestamp, check, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { users } from "./users";
import { authorsToEntries } from "./authors-to-entries";
import { authorsToLocations } from "./authors-to-locations";
import { authorsToSources } from "./authors-to-sources";
import * as schema from "../schema";

export const authors = pgTable("authors", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  name: text().notNull(),
  years: text(),
  description: text(),
  status: publishStatusesEnum().default("draft").notNull(),
  current_version: integer().default(1).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  check("description_not_empty_check", sql`${t.description} IS NULL OR ${t.description} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const authorsRelations = () => defineRelationsPart(schema, (r) => ({
  authors: {
    version: r.one.versions({
      from: [r.authors.id, r.authors.current_version],
      to: [r.versions.versionable_id, r.versions.version],
      where: {
        versionable_type: "authors",
      },
    }),
    entries: r.many.entries({
      from: r.authors.id.through(r.authorsToEntries.author_id),
      to: r.entries.id.through(r.authorsToEntries.entry_id),
    }),
    locations: r.many.locations({
      from: r.authors.id.through(r.authorsToLocations.author_id),
      to: r.locations.id.through(r.authorsToLocations.location_id),
    }),
    sources: r.many.sources({
      from: r.authors.id.through(r.authorsToSources.author_id),
      to: r.sources.id.through(r.authorsToSources.source_id),
    }),
    image: r.one.attachments({
      from: r.authors.id,
      to: r.attachments.attachable_id,
      where: {
        attachable_type: "authors",
        name: "image",
      },
    }),
  },
}));

export const authorsInsertSchema = createInsertSchema(authors, {
  name: (z) => z.nonempty(),
});

export const authorsUpdateSchema = createUpdateSchema(authors, {
  name: (z) => z.nonempty(),
});
