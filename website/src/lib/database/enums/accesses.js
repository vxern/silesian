import { pgEnum } from "drizzle-orm/pg-core";

export const accessesEnum = pgEnum("accesses", ["closed", "limited", "open"]);
