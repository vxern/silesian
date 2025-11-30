import { pgEnum } from "drizzle-orm/pg-core";

export const themesEnum = pgEnum("themes", ["dark"])
