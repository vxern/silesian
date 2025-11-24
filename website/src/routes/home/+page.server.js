import { dayjs } from "../../helpers/dates.js";
import { db } from "$lib/database.server";
import { entries } from "$lib/database/schema";
import { gte, count } from 'drizzle-orm';

export const load = async () => {
  const [totalImported, importedThisMonth] = await Promise.all([
    db.$count(entries),
    db.$count(entries, gte(entries.created_at, dayjs().startOf("month"))),
  ]);

  return { totalImported, importedThisMonth };
};