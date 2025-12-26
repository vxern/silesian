import { text, timestamp } from "drizzle-orm/pg-core";
import { authUsers } from "./users";
import { auth } from "./schema";

export const authSessions = auth.table("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
