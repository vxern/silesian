import { pgEnum } from "drizzle-orm/pg-core";

export const countriesEnum = pgEnum("countries", [
  "poland",
  "czechia",
  "germany",
  "slovakia",
]);
