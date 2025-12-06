import { pgEnum } from "drizzle-orm/pg-core";

export const publishStatusesEnum = pgEnum("publish_statuses", ["draft", "pending", "published"]);
