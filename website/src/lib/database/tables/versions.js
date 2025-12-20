import { defineRelationsPart } from "drizzle-orm";
import { pgTable, bigint, integer, text, unique, timestamp, json, index } from "drizzle-orm/pg-core";
import { users } from "./users";
import { reviews } from "./reviews";
import { authors } from "./authors";
import * as schema from "../schema";

export const versions = pgTable("versions", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  version: integer().default(1).notNull(),
  versionable_type: text().notNull(),
  versionable_id: bigint({ mode: "number" }).notNull(),
  // `NULL` until a new version is created.
  snapshot: json(),
  author_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // Versions are immutable so no `updated_at`.
}, (t) => [
  unique().on(t.version, t.versionable_type, t.versionable_id),
  index().on(t.author_id),
]);

export const versionsRelations = () => defineRelationsPart(schema, (r) => ({
  versions: {
    author: r.one.users({
      from: r.versions.author_id,
      to: r.users.id,
    }),
    reviews: r.many.reviews({
      from: r.versions.id,
      to: r.reviews.version_id,
    }),
  },
}));
