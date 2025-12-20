import { defineRelationsPart } from "drizzle-orm";
import { pgTable, bigint, timestamp } from "drizzle-orm/pg-core";
import { timeEntryScopesEnum } from "../enums/time-entry-scopes";
import { users } from "./users";
import * as schema from "../schema";

export const timeEntries = pgTable("time_entries", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  user_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
  scope: timeEntryScopesEnum().notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // No updated_at because time entries are never updated.
});

export const timeEntriesRelations = () => defineRelationsPart(schema, (r) => ({
  timeEntries: {
    author: r.one.users({
      from: r.timeEntries.user_id,
      to: r.users.id,
    }),
  },
}))
