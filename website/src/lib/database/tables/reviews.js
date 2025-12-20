import { defineRelationsPart } from "drizzle-orm";
import { pgTable, bigint, text, uniqueIndex, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { reviewDecisionsEnum } from "../enums/review-decisions";
import { versions } from "./versions";
import { users } from "./users";
import * as schema from "../schema";

export const reviews = pgTable("reviews", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  version_id: bigint({ mode: "number" }).references(() => versions.id, { onDelete: "cascade" }).notNull(),
  reviewer_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
  decision: reviewDecisionsEnum().notNull(),
  comment: text(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  // No updated_at because reviews are never updated.
}, (t) => [uniqueIndex().on(t.version_id, t.reviewer_id)])

export const reviewsRelations = () => defineRelationsPart(schema, (r) => ({
  reviews: {
    version: r.one.versions({
      from: r.reviews.version_id,
      to: r.versions.id,
    }),
    reviewer: r.one.users({
      from: r.reviews.reviewer_id,
      to: r.users.id,
    }),
  },
}));

export const reviewsInsertSchema = createInsertSchema(reviews, {
  name: (z) => z.nonempty(),
});
