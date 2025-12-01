import { relations } from "drizzle-orm";
import { pgTable, bigint, integer, text, unique, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { reviews } from "./reviews";

export const versions = pgTable("versions", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  version: integer().default(1).notNull(),
  versionable_type: text().notNull(),
  versionable_id: bigint({ mode: "number" }).notNull(),
  author_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
  // Should be equal to the `created_at` of the `versionable` in the first version.
  // Should be equal to the `updated_at` of the `versionable` in the last version.
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // Versions are immutable so no `updated_at`.
}, (t) => [unique().on(t.version, t.versionable_type, t.versionable_id)]);

export const versionsRelations = relations(versions, ({ many, one }) => ({
  author: one(users, { fields: [versions.author_id], references: [users.id] }),
  reviews: many(reviews),
}));
