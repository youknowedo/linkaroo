import { pgTable, text } from 'drizzle-orm/pg-core';

export * from './auth';

export const sitesTable = pgTable('sites', {
	id: text('id').primaryKey(),
	name: text('name').notNull().unique(),
	domain: text('domain').notNull().unique(),
	umamiId: text('umami_id').notNull().unique()
});
