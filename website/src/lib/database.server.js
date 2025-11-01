import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DATABASE_URL } from '$env/dynamic/private';
import schema from "$lib/database/schema";

const client = postgres(DATABASE_URL);

export const db = drizzle(client, { schema });
