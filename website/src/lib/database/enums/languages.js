import { pgEnum } from "drizzle-orm/pg-core";

export const languagesEnum = pgEnum("languages", [
  "szl",
  "pl",
  "cs",
  "sk",
  "de",
  "en-GB",
]);
