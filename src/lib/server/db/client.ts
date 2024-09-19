import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from '$env/static/private';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const { Client } = pg;

const client = new Client({
	host: DB_HOST,
	port: 5432,
	user: DB_USER,
	password: DB_PASS,
	database: DB_NAME
});

await client.connect();
export const db = drizzle(client);
