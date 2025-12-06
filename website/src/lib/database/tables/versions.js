import { relations } from "drizzle-orm";
import { pgTable, bigint, integer, text, unique, timestamp, json } from "drizzle-orm/pg-core";
import { users } from "./users";
import { reviews } from "./reviews";
import { authors } from "./authors";

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
}, (t) => [unique().on(t.version, t.versionable_type, t.versionable_id)]);

export const versionsRelations = relations(versions, ({ many, one }) => ({
  author: one(users, { fields: [versions.author_id], references: [users.id] }),
  reviews: many(reviews),
}));
