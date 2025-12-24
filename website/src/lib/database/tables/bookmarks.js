import { defineRelationsPart, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, bigint, text, unique } from "drizzle-orm/pg-core";
import { users } from "./users";
import * as schema from "../schema";

export const bookmarks = pgTable("bookmarks", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  user_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
  bookmarkable_type: text().notNull(),
  bookmarkable_id: bigint({ mode: "number" }).notNull(),
}, (t) => [
  unique().on(t.user_id, t.bookmarkable_type, t.bookmarkable_id),
]);

export const bookmarksRelations = () => defineRelationsPart(schema, (r) => ({
  bookmarks: {
    user: r.one.users({
      from: r.bookmarks.user_id,
      to: r.users.id,
    }),
  },
}));

export const bookmarksInsertSchema = createInsertSchema(bookmarks);
