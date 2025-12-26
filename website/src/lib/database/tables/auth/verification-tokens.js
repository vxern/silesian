import { text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { auth } from "./schema";

export const authVerificationTokens = auth.table(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationTokens) => [
    {
      compositePk: primaryKey({
        columns: [verificationTokens.identifier, verificationTokens.token],
      }),
    },
  ],
);
