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
 * Performs 2 queries if only the status changes, otherwise 4 queries:
 * - Get record in its current state.
 * - Create version.
 * - Update record.
 * - Update old version with a snapshot of the current data.
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
        snapshot[key] = values[key];
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
        .returning({ id: table.id, ...returning})
        .then((results) => results.at(0))
        .catch((error) => tx.rollback());

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
export async function findMany(table, properties) {
  console.log(db.query.entries.findMany);

  let results = await db.query[getTableName(table)].findMany(properties);
  if (!properties.with) {
    return results;
  }

  return transformResults(results, { relations: properties.with });
}

function transformResults(results, { relations: relations_ }) {
  for (let [relationName, relations] of Object.entries(relations_)) {
    if (relations === true) {
      continue;
    }

    if ("with" in relations) {
      relations = relations.with;
    }
    
    if (relationName.endsWith("s")) {
      for (const result of results) {
        const singularRelationName = relationName.endsWith("ies") ? `${relationName.slice(0, -3)}y` : relationName.slice(0, -1);
        result[relationName] = result[relationName].map((join) => {
          transformResults(join[singularRelationName], { relations });
          return join[singularRelationName];
        });
      }
    } else {
      for (const result of results) {
        delete result[`${relationName}_id`];
        if (result[relationName]) {
          transformResults([result[relationName]], { relations });
        }
      }
    }
  }

  return results;
}
