import { text, integer, boolean, primaryKey } from "drizzle-orm/pg-core";
import { authUsers } from "./users";
import { auth } from "./schema";

export const authAuthenticators = auth.table(
  "authenticators",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticators) => [
    {
      compositePK: primaryKey({
        columns: [authenticators.userId, authenticators.credentialID],
      }),
    },
  ],
);
