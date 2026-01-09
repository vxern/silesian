import { pgTable, bigint, text } from "drizzle-orm/pg-core";
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const blobs = pgTable("blobs", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  key: text().notNull(),
  type: text().notNull(),
  checksum: text().notNull(),
  byte_size: bigint({ mode: "number" }).notNull(),
});

export const blobsRelations = () => defineRelationsPart(schema, (r) => ({
  blobs: {
    attachments: r.many.attachments({
      from: r.blobs.id,
      to: r.attachments.blob_id,
    }),
  },
}));
