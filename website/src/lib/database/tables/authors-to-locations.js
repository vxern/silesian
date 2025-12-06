import { relations } from "drizzle-orm";
import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { authors } from "./authors";
import { locations } from "./locations";

export const authorsToLocations = pgTable("authors_to_locations", {
  id: bigint({ mode: "number" }).generatedAlwaysAsIdentity(),
  author_id: bigint({ mode: "number" }).references(() => authors.id, { onDelete: "cascade" }).notNull(),
  location_id: bigint({ mode: "number" }).references(() => locations.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.author_id, t.location_id] })]);

export const authorsToLocationsRelations = relations(authorsToLocations, ({ one }) => ({
  author: one(authors, { fields: [authorsToLocations.author_id], references: [authors.id] }),
  location: one(locations, { fields: [authorsToLocations.location_id], references: [locations.id] }),
}));
