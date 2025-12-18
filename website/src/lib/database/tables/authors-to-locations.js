import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { authors } from "./authors";
import { locations } from "./locations";

export const authorsToLocations = pgTable("authors_to_locations", {
  author_id: bigint({ mode: "number" }).references(() => authors.id, { onDelete: "cascade" }).notNull(),
  location_id: bigint({ mode: "number" }).references(() => locations.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.author_id, t.location_id] })]);
