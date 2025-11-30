import { pgEnum } from "drizzle-orm/pg-core";

export const licencesEnum = pgEnum("licences", ["proprietary", "granted", "public"]);
