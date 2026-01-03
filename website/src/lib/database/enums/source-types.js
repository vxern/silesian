import { pgEnum } from "drizzle-orm/pg-core";

export const sourceTypesEnum = pgEnum(
  "source_types",
  [
    "book",
    "manuscript",
    "magazine",
    "article",
    "brochure",
  ],
);
