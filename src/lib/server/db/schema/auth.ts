import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const roles = pgEnum('role', ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);

export const userTable = pgTable('users', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: roles('role').notNull().default('EDITOR')
});

export const sessionTable = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
