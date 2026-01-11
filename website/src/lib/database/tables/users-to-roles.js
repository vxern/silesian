import { pgTable, bigint, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { roles } from "./roles";

export const usersToRoles = pgTable("users_to_roles", {
  user_id: bigint({ mode: "number" }).references(() => users.id, { onDelete: "cascade" }).notNull(),
  role_id: bigint({ mode: "number" }).references(() => roles.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.user_id, t.role_id] })]);
