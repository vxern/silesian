import { drizzle } from 'drizzle-orm/postgres-js';
import { EnhancedQueryLogger } from 'drizzle-query-logger';
import { PgSelectBase } from 'drizzle-orm/pg-core';
import postgres from 'postgres';
import { isEqual } from 'es-toolkit/predicate';
import {
  DATABASE_HOST, 
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
} from '$env/static/private';
import {
  authorsToEntries,
  authorsToLocations,
  authorsToSources,
  authors,
  categories,
  entriesToCategories,
  entries,
  locations,
  reviews,
  searchFrequencies,
  searches,
  settingsToCategories,
  settingsToSources,
  settings,
  sources,
  timeEntries,
  users,
  versions,
  authorsRelations,
  categoriesRelations,
  entriesRelations,
  locationsRelations,
  reviewsRelations,
  searchesRelations,
  settingsRelations,
  sourcesRelations,
  timeEntriesRelations,
  usersRelations,
  versionsRelations,
} from "$lib/database/schema";
import { versions, reviews } from "$lib/database/schema";
import { getTableName, sql, and, eq, inArray } from 'drizzle-orm';

const client = postgres({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_DATABASE,
});

export const db = drizzle({
  client,
  schema: {
    authorsToEntries,
    authorsToLocations,
    authorsToSources,
    authors,
    categories,
    entriesToCategories,
    entries,
    locations,
    reviews,
    searchFrequencies,
    searches,
    settingsToCategories,
    settingsToSources,
    settings,
    sources,
    timeEntries,
    users,
    versions,
  },
  relations: {
    ...authorsRelations(),
    ...categoriesRelations(),
    ...entriesRelations(),
    ...locationsRelations(),
    ...reviewsRelations(),
    ...searchesRelations(),
    ...settingsRelations(),
    ...sourcesRelations(),
    ...timeEntriesRelations(),
    ...usersRelations(),
    ...versionsRelations(),
  },
  logger: new EnhancedQueryLogger(),
});

PgSelectBase.prototype.withVersions = function () {
  return this.innerJoin(versions, and(
    eq(versions.versionable_id, this._.config.table.id),
    eq(versions.versionable_type, getTableName(this._.config.table)),
    eq(versions.version, this._.config.table.current_version),
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
        .catch((error) => {console.error(error); tx.rollback()});

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
 * Performs 2 queries if only the status changes, otherwise 3 queries:
 * - Get record in its current state.
 * - Create version with a snapshot of the updated data.
 * - Update record.
 */
export async function versionedUpdate({ table, id, authorId, values, returning = {} }) {
  return db.transaction(async (tx) => {
    const oldRecord =
      await db
        .select()
        .from(table)
        .where(eq(table.id, id))
        .limit(1)
        .then((results) => results.at(0))
        .catch((error) => tx.rollback());

    const snapshot = {};
    for (const key in values) {
      if (!isEqual(values[key], oldRecord[key])) {
        snapshot[key] = oldRecord[key];
      }
    }
    
    delete snapshot["status"];

    if (Object.keys(snapshot).length === 0) {
      return db
        .update(table)
        .set(values)
        .where(eq(table.id, id))
        .returning({ id: table.id, ...returning})
        .then((results) => results.at(0))
        .catch((error) => tx.rollback());
    }

    const version = await db.insert(versions).values({
      version: oldRecord.current_version + 1,
      versionable_type: getTableName(table),
      versionable_id: id,
      snapshot: JSON.stringify(snapshot),
      author_id: authorId,
    }).onConflictDoUpdate({
      target: [versions.version, versions.versionable_type, versions.versionable_id],
      set: { version: sql`${versions.version} + 1` },
    }).returning({ version: versions.version })
      .then((results) => results.at(0))
      .catch((error) => tx.rollback());

    const record =
      await db
        .update(table)
        .set({ ...values, current_version: version.version })
        .where(eq(table.id, id))
        .returning({ id: table.id, ...returning})
        .then((results) => results.at(0))
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
      status: "draft",
      deleted: true,
    },
  });
}

/**
 * Performs up to 2 queries, depending on the existing and the new IDs:
 * - Create added joins.
 * - Delete removed joins.
 */
export async function versionedJoin({ table, source, sourceColumnName, targetIds, targetColumnName, existingIds, authorId }) {
  const now = new Date();

  const idsToInsert = new Set(targetIds);
  for (const existingId of existingIds) {
    idsToInsert.delete(existingId);
  }

  const idsToDelete = new Set(existingIds);
  for (const id of targetIds) {
    idsToDelete.delete(id);
  }

  if (idsToInsert.size === 0 && idsToDelete.size === 0) {
    return;
  }

  return db.transaction(async (tx) => {
    if (idsToInsert.size > 0) {
      await db
        .insert(table)
        .values(
          Array.from(idsToInsert).map(
            (targetId) => ({
              [sourceColumnName]: source.id,
              [targetColumnName]: targetId,
            }),
          ),
        )
        .catch((error) => tx.rollback());
    }

    if (idsToDelete.size > 0) {
      await db
        .delete(table)
        .where(inArray(table[targetColumnName], Array.from(idsToDelete)))
        .catch((error) => tx.rollback());
    }
  });
}

/** Performs 1 query. */
export async function insertReview({ table, id, values }) {
  const review = await db.insert(reviews).values({
    version_id:
      sql`${
        db
        .select({ version_id: versions.id })
        .from(table)
        .withVersions()
        .where(eq(table.id, id))
        .limit(1)
      }`,
    ...values,
  });
}

/** Performs 1 query. */
export async function autocomplete({ table, params, ...props }) {
  // TODO(vxern): Validate.

  const where = {
    deleted: false,
  };

  if (params.get("query").length > 0) {
    where.name = { ilike: `%${params.get("query")}%` };
  }

  if (params.has("include_unpublished")) {
    where.OR = [
      { status: "published" },
      { 
        AND: [
          { status: { ne: "published" } },
          // TODO(vxern): Set the right author.
          { version: { author_id: 1 } },
        ],
      },
    ];
  } else {
    where.status = "published";
  }

  return db.query[getTableName(table)].findMany({
    where,
    // TODO(vxern): Move to consonants.
    limit: params.limit ?? 100,
    ...props,
  });
}
