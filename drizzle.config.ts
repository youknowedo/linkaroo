import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema/index.ts',
	out: './drizzle',
	dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
	dbCredentials: {
		host: process.env.DB_HOST!,
		user: process.env.DB_USER!,
		password: process.env.DB_PASS!,
		database: process.env.DB_NAME!
	}
});
