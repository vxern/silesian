import { relations } from "drizzle-orm";
import { pgTable, bigint, text, uniqueIndex, timestamp } from "drizzle-orm/pg-core";
import { reviewDecisionsEnum } from "../enums/review-decisions";
import { versions } from "./versions";
import { users } from "./users";

export const reviews = pgTable("reviews", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  version_id: bigint({ mode: "number" }).references(() => versions.id, { onDelete: "cascade" }).notNull(),
  reviewer_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
  decision: reviewDecisionsEnum().notNull(),
  comment: text(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // No updated_at because reviews are never updated.
}, (t) => [uniqueIndex().on(t.version_id, t.reviewer_id)])

export const reviewsRelations = relations(reviews, ({ one }) => ({
  version: one(versions, { fields: [reviews.version_id], references: [versions.id] }),
  reviewer: one(users, { fields: [reviews.reviewer_id], references: [users.id] }),
}));
