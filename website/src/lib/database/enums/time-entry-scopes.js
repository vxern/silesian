import { pgEnum } from "drizzle-orm/pg-core";

export const timeEntryScopesEnum = pgEnum("time_entry_scopes", [
  "using",
  "editing",
]);
