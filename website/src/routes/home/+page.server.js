import dayjs from "dayjs";
import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";
import { gte, count } from 'drizzle-orm';

export const load = async () => {
  const [totalImported, importedThisMonth] = await Promise.all([
    db.select({ count: count() }).from(entries).then((results) => results.at(0).count),
    db.select({ count: count() }).from(entries).where(gte(entries.created_at, dayjs().startOf("month"))).then((results) => results.at(0).count),
  ]);

  return { totalImported, importedThisMonth };
};