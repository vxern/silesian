import { defineRelationsPart, sql } from "drizzle-orm";
import { text, timestamp, primaryKey, unique, check } from "drizzle-orm/pg-core";
import { auth } from "./schema";
import * as schema from "../../schema";

export const authUsers = auth.table("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
}, (t) => [
  unique().on(t.email),
  check("name_empty_check", sql`${t.name} IS NULL OR ${t.name} <> ''`),
  check("email_empty_check", sql`${t.email} IS NULL OR ${t.email} <> ''`),
]);

export const authUsersRelations = () => defineRelationsPart(schema, (r) => ({
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
