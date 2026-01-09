import { pgTable, bigint, text } from "drizzle-orm/pg-core";
import { defineRelationsPart } from "drizzle-orm";
import { blobs } from "./blobs";
import * as schema from "../schema";

export const attachments = pgTable("attachments", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  attachable_type: text().notNull(),
  attachable_id: bigint({ mode: "number" }).notNull(),
  blob_id: bigint({ mode: "number" }).references(() => blobs.id, { onDelete: "cascade" }).notNull(),
});

export const attachmentsRelations = () => defineRelationsPart(schema, (r) => ({
  attachments: {
    blob: r.one.blobs({
      from: r.attachments.blob_id,
      to: r.blobs.id,
    }),
  },
}));
