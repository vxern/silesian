import { pgEnum } from "drizzle-orm/pg-core";

export const sourceTypesEnum = pgEnum(
  "source_types",
  [
    "book",
    "magazine",
    "article",
    "brochure",
  ],
);
