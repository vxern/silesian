import { drizzle } from 'drizzle-orm/postgres-js';
import { PgSelectBase } from 'drizzle-orm/pg-core';
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
import { getTableName, sql, and, eq, inArray } from 'drizzle-orm';

const client = postgres({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_DATABASE,
});

export const db = drizzle({ client, schema, logger: true });

PgSelectBase.prototype.withVersions = function () {
  return this.innerJoin(versions, and(
    eq(versions.versionable_id, this._.config.table.id),
    eq(versions.versionable_type, getTableName(this._.config.table)),
    eq(versions.version, this._.config.table.version),
  ));
};

/**
 * Performs 2 queries:
 * - Create records.
 * - Create versions.
 */
export async function versionedInsert({ table, values, authorId, returning = {} }) {
  return db.transaction(async (tx) => {
    const now = new Date();

    const records =
      await db
        .insert(table)
        .values(values)
        .returning({
          id: table.id,
          ...returning,
        })
        .catch((error) => tx.rollback());

    await db.insert(versions).values(
      records.map(
        (record) => ({
          versionable_type: getTableName(table),
          versionable_id: record.id,
          author_id: authorId,
          created_at: now,
        }),
      ),
    ).catch((error) => tx.rollback());

    if (Array.isArray(values)) {
      return records;
    } else {
      return records.at(0);
    }
  });
}

/**
 * Performs 4 queries:
 * - Get record in its current state.
 * - Create version.
 * - Update record.
 * - Update old version with a snapshot of the current data.
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
        .set({ ...values, version: version.version })
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

/** Performs the same queries as {@link versionedUpdate}. */
export async function versionedDelete({ table, id, authorId }) {
  return versionedUpdate({
    table,
    id,
    authorId,
    values: {
      // TODO(vxern): Insert this dynamically depending on whether the table's got it.
      status: "draft",
      deleted: true,
    },
  });
}

/**
 * Performs  queries, depending on the existing and the new IDs:
 * - Create added joins.
 * - Delete removed joins.
 */
export async function versionedJoin({ table, source, sourceColumnName, targetIds, targetColumnName, authorId }) {
  const idsToInsert = new Set(ids);
  for (const existingId of existingIds) {
    idsToInsert.delete(existingId);
  }

  const idsToDelete = new Set(existingIds);
  for (const id of ids) {
    idsToDelete.delete(id);
  }

  if (idsToInsert.size === 0 && idsToDelete.size === 0) {
    return;
  }

  return db.transaction(async (tx) => {
    const now = new Date();

    const insertedIds = [];
    if (idsToInsert.size > 0) {
      insertedIds.push(
        ...await db
          .insert(table)
          .values(
            idsToInsert.map(
              (targetId) => ({
                [sourceColumnName]: source.id,
                [targetColumnName]: targetId,
              }),
            ),
          )
          .returning({ id: table.id })
          .then((results) => results.map((result) => result.id))
          .catch((error) => tx.rollback()),
      );
    }

    const deletedIds = [];
    if (idsToDelete.size > 0) {
      deletedIds.push(
        ...await db
          .delete(table)
          .where(inArray(table[targetColumnName], idsToDelete))
          .returning({ id: table.id })
          .then((results) => results.map((result) => result.id))
          .catch((error) => tx.rollback()),
      );
    }

    await db.insert(versions).values(
      [
        ...insertedIds,
        ...deletedIds,
      ].map(
        () => ({
          versionable_type: getTableName(table),
          versionable_id: id,
          author_id: authorId,
          created_at: now,
        }),
      ),
    ).catch((error) => tx.rollback());
  });
}
