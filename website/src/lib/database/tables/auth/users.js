import { defineRelationsPart, sql } from "drizzle-orm";
import { text, timestamp, primaryKey, unique, check } from "drizzle-orm/pg-core";
import { auth } from "./schema";
import * as schema from "../../schema";

export const authUsers = auth.table("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
}, (t) => [
  unique().on(t.email),
  check("name_empty_check", sql`${t.name} IS NULL OR ${t.name} <> ''`),
  check("email_empty_check", sql`${t.email} IS NULL OR ${t.email} <> ''`),
]);

export const authUsersRelations = () => defineRelationsPart(schema, (r) => ({
  authUsers: {
    user: r.one.users({
      from: r.authUsers.id,
      to: r.users.auth_user_id,
    }),
  },
}));
