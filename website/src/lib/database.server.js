import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { isEqual } from 'es-toolkit/predicate';
import {
  DATABASE_HOST, 
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
} from '$env/static/private';
import * as schema from "$lib/database/schema";
import { versions } from "$lib/database/schema";
import { getTableName, sql, and, eq } from 'drizzle-orm';

const client = postgres({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_DATABASE,
});

export const db = drizzle({ client, schema, logger: true });

/**
 * Performs 2 queries:
 * - Create the record.
 * - Create a version.
 */
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
        .then((results) => results.at(0))
        .catch((error) => tx.rollback());

    await db.insert(versions).values({
      versionable_type: getTableName(table),
      versionable_id: record.id,
      author_id: record.author_id,
      created_at: record.created_at,
    }).catch((error) => tx.rollback());

    return record;
  });
}

/**
 * Performs 4 queries:
 * - Get the record in its current state.
 * - Create a version.
 * - Update the record.
 * - Update the old version with a snapshot of the current data.
 */
export async function versionedUpdate({ table, id, authorId, values }) {
  return db.transaction(async (tx) => {
    const oldRecord =
      await db
        .select()
        .from(table)
        .where(eq(table.id, id))
        .limit(1)
        .then((results) => results.at(0))
        .catch((error) => tx.rollback());

    const version = await db.insert(versions).values({
      version: oldRecord.version + 1,
      versionable_type: getTableName(table),
      versionable_id: id,
      author_id: authorId,
    }).onConflictDoUpdate({
      target: [versions.version, versions.versionable_type, versions.versionable_id],
      set: { version: sql`${versions.version} + 1` },
    }).returning({
        version: versions.version,
        created_at: versions.created_at,
      })
      .then((results) => results.at(0))
      .catch((error) => tx.rollback());

    const record =
      await db
        .update(table)
        .set({ ...values, version: version.version, updated_at: version.created_at })
        .where(eq(table.id, id))
        .returning()
        .then((results) => results.at(0))
        .catch((error) => tx.rollback());

    const snapshot = {};
    for (const key in oldRecord) {
      if (!isEqual(oldRecord[key], record[key])) {
        snapshot[key] = oldRecord[key];
      }
    }

    await db
      .update(versions)
      .set({ snapshot: JSON.stringify(snapshot) })
      .where(
        and(
          eq(versions.versionable_type, getTableName(table)),
          eq(versions.versionable_id, record.id),
          eq(versions.version, oldRecord.version),
        ),
      )
      .catch((error) => tx.rollback());

    return record;
  });
}

export async function versionedDrop() {
  // TODO(vxern): Implement.
}

export async function insertJoin() {
  // TODO(vxern): Implement.
}
