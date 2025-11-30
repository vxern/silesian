import { pgEnum } from "drizzle-orm/pg-core";

export const lifecyclesEnum = pgEnum("lifecycles", ["active", "inactive", "deleted"]);
