import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { sources } from "./sources";
import { locations } from "./locations";

export const sourcesToLocations = pgTable("sources_to_locations", {
  source_id: bigint({ mode: "number" }).references(() => sources.id, { onDelete: "cascade" }).notNull(),
  location_id: bigint({ mode: "number" }).references(() => locations.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.source_id, t.location_id] })]);
