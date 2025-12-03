import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {
  DATABASE_HOST, 
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
} from '$env/static/private';
import * as schema from "$lib/database/schema";
import { versions } from "$lib/database/schema";
import { getTableName, sql } from 'drizzle-orm';

const client = postgres({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_DATABASE,
});

export const db = drizzle({ client, schema });

export async function versionedInsert({ table, values, returning = {} }) {
  return db.transaction(async (tx) => {
    const record =
      await db
        .insert(table)
        .values(values)
        .returning({
          id: table.id,
          author_id: table.author_id,
          created_at: table.created_at,
          ...returning,
        })
        .then((result) => result.at(0))
        .catch((error) => tx.rollback());

    const result = await db.insert(versions).values({
      versionable_type: getTableName(table),
      versionable_id: record.id,
      author_id: record.author_id,
      created_at: record.created_at,
    }).onConflictDoUpdate({
      target: [versions.version, versions.versionable_type, versions.versionable_id],
      set: { version: sql`${versions.version} + 1` },
    }).catch((error) => tx.rollback());

    return record;
  });
}
