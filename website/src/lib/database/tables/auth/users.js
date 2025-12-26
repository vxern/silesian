import { text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { auth } from "./schema";

export const authUsers = auth.table("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});
