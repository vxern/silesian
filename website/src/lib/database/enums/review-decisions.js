import { pgEnum } from "drizzle-orm/pg-core";

export const reviewDecisionsEnum = pgEnum("review_decisions", ["accepted", "rejected"]);
