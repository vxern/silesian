import { dayjs } from "../../helpers/dates.js";
import { db } from "$lib/database.server";
import { entries, versions } from "$lib/database/schema";
import { gte, count } from 'drizzle-orm';

export const load = async () => {
  const [totalImported, importedThisMonth] = await Promise.all([
    getTotalImported(),
    getImportedThisMonth(),
  ]);

  return { totalImported, importedThisMonth };
};

function getTotalImported() {
  return db.$count(entries);
}

function getImportedThisMonth() {
  return db
    .select({ count: count() })
    .from(entries)
    .withVersions()
    .where(gte(versions.created_at, dayjs().startOf("month")))
    .then((results) => results.at(0).count);
}
