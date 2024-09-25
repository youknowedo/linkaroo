import { json, pgTable, text } from 'drizzle-orm/pg-core';

export const pagesTable = pgTable('pages', {
	id: text('id').primaryKey(),
	siteId: text('site_id').notNull(),
	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique(),
	blocks: json('blocks').notNull().default([])
});
