import { defineConfig } from 'drizzle-kit';
import { 
	DATABASE_HOST,
	DATABASE_USER,
	DATABASE_PASSWORD,
	DATABASE_DATABASE,
} from '$env/static/private';

export default defineConfig({
	out: "./migrations",
	dialect: 'postgresql',
	schema: './src/lib/database/schema.js',
	dbCredentials: {
		host: DATABASE_HOST,
		user: DATABASE_USER,
		password: DATABASE_PASSWORD,
		database: DATABASE_DATABASE,
	},
});
