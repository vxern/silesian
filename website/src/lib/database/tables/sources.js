import { defineRelationsPart, sql } from "drizzle-orm";
import { pgTable, integer, bigint, text, boolean, timestamp, check, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { publishStatusesEnum } from "../enums/publish-statuses";
import { licencesEnum } from "../enums/licences";
import { orthographiesEnum } from "../enums/orthographies";
import { languagesEnum } from "../enums/languages";
import { accessesEnum } from "../enums/accesses";
import { entries } from "./entries";
import { authorsToSources } from "./authors-to-sources";
import { authors } from "./authors";
import * as schema from "../schema";

export const sources = pgTable("sources", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  name: text().notNull(),
  description: text(),
  url: text(),
  year: text(),
  licence: licencesEnum().notNull(),
  orthography: orthographiesEnum().notNull(),
  source_language: languagesEnum().notNull(),
  target_language: languagesEnum().notNull(),
  access: accessesEnum().notNull(),
  redistributable: boolean().default(false).notNull(),
  imported_entry_count: integer().default(0).notNull(),
  total_entry_count: integer(),
  status: publishStatusesEnum().default("draft").notNull(),
  current_version: integer().default(1).notNull(),
}, (t) => [
  check("name_not_empty_check", sql`${t.name} <> ''`),
  check("description_not_empty_check", sql`${t.description} IS NULL OR ${t.description} <> ''`),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
  index().on(t.status),
]);

export const sourcesRelations = () => defineRelationsPart(schema, (r) => ({
  sources: {
    version: r.one.versions({
      from: [r.sources.id, r.sources.current_version],
      to: [r.versions.versionable_id, r.versions.version],
      where: {
        versionable_type: "sources",
      },
    }),
    // TODO(vxern): Need to store join tables in snapshots as well.
    // TODO(vxern): And then once we've got these join tables stored, need to display them in the version history.
    authors: r.many.authors({
      from: r.sources.id.through(r.authorsToSources.source_id),
      to: r.authors.id.through(r.authorsToSources.author_id),
    }),
    settings: r.many.settings({
      from: r.sources.id.through(r.settingsToSources.source_id),
      to: r.settings.id.through(r.settingsToSources.settings_id),
    }),
    entries: r.many.entries({
      from: r.sources.id,
      to: r.entries.source_id,
    }),
  },
}));

export const sourcesInsertSchema = createInsertSchema(sources, {
  name: (z) => z.nonempty(),
  description: (z) => z.nonempty(),
});

export const sourcesUpdateSchema = createUpdateSchema(sources, {
  lemma: (z) => z.nonempty(),
});
