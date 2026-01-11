import { defineRelationsPart } from "drizzle-orm";
import { pgTable, bigint, text, uniqueIndex, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { permissionsEnum } from "../enums/permissions";
import { versions } from "./versions";
import { users } from "./users";
import * as schema from "../schema";

export const roles = pgTable("roles", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  permissions: permissionsEnum().array().default([]).notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  unique().on(t.name),
]);

export const rolesRelations = () => defineRelationsPart(schema, (r) => ({
  roles: {
    users: r.many.users({
      from: r.roles.id.through(r.usersToRoles.role_id),
      to: r.users.id.through(r.usersToRoles.user_id),
    }),
  },
}));
