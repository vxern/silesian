import { defineRelationsPart, sql } from "drizzle-orm";
import { pgTable, bigint, integer, text, timestamp, unique, check, boolean, index } from "drizzle-orm/pg-core";
import { authUsers } from "./auth/users";
import { settings } from "./settings";
import { versions } from "./versions";
import { reviews } from "./reviews";
import { searches } from "./searches";
import { sources } from "./sources";
import { entries } from "./entries";
import { categories } from "./categories";
import { timeEntries } from "./time-entries";
import * as schema from "../schema";

export const users = pgTable("users", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  deleted: boolean().default(false).notNull(),
  auth_user_id: text().references(() => authUsers.id, { onDelete: "cascade" }).notNull(),
  // TODO(vxern): Move these elsewhere because they're going to be reflected in version snapshots otherwise.
  searches_count: integer().default(0).notNull(),
  additions_count: integer().default(0).notNull(),
  changes_count: integer().default(0).notNull(),
  reviews_count: integer().default(0).notNull(),
  // In milliseconds.
  time_spent_using: integer().default(0).notNull(),
  // In milliseconds.
  time_spent_editing: integer().default(0).notNull(),
  current_version: integer().default(1).notNull(),
}, (t) => [
  unique().on(t.auth_user_id),
  index().on(t.deleted).where(sql`${t.deleted} IS FALSE`),
]);

export const usersRelations = () => defineRelationsPart(schema, (r) => ({
  users: {
    version: r.one.versions({
      from: [r.users.id, r.users.current_version],
      to: [r.versions.versionable_id, r.versions.version],
      where: {
        versionable_type: "users",
      }
    }),
    authUser: r.one.authUsers({
      from: r.users.auth_user_id,
      to: r.authUsers.id,
    }),
    bookmarks: r.many.bookmarks({
      from: r.users.id,
      to: r.bookmarks.user_id,
    }),
    roles: r.many.roles({
      from: r.users.id.through(r.usersToRoles.user_id),
      to: r.roles.id.through(r.usersToRoles.role_id),
    }),
    // TODO(vxern): A user can in fact only have one set of settings.
    settings: r.many.settings({
      from: r.users.id,
      to: r.settings.user_id,
    }),
    versions: r.many.versions({
      from: r.users.id,
      to: r.versions.author_id,
    }),
    reviews: r.many.reviews({
      from: r.users.id,
      to: r.reviews.reviewer_id,
    }),
    searches: r.many.searches({
      from: r.users.id,
      to: r.searches.searcher_id,
    }),
    timeEntries: r.many.timeEntries({
      from: r.users.id,
      to: r.timeEntries.user_id,
    }),
  },
}));
