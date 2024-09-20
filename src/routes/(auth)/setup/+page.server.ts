import { db } from '$lib/server/db/client';
import { userTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const setupCompleted =
		(await db.select({}).from(userTable).where(eq(userTable.id, 'admin'))).length > 0;

	if (setupCompleted) return redirect(302, '/dashboard');
};
