import { text, integer, primaryKey } from "drizzle-orm/pg-core";
import { authUsers } from "./users";
import { auth } from "./schema";

export const authAccounts = auth.table(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (accounts) => [
    {
      compoundKey: primaryKey({
        columns: [accounts.provider, accounts.providerAccountId],
      }),
    },
  ],
);
