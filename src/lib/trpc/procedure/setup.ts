import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db/client';
import { sitesTable, userTable } from '$lib/server/db/schema';
import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { z } from 'zod';
import { t, type Res } from '..';
import { umami } from './analytics';

export const setup = t.procedure
	.input(
		z.object({
			email: z.string().email(),
			username: z.string().min(3).max(20),
			password: z.string().min(8),
			passwordConfirmation: z.string().min(8),

			websiteName: z.string().min(3).max(20),
			domain: z.string().url()
		})
	)
	.mutation(async ({ ctx, input }): Promise<Res> => {
		const { email, username, password, passwordConfirmation } = input;

		if (password !== passwordConfirmation) {
			return {
				success: false,
				error: 'Passwords do not match'
			};
		}

		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		const userId = generateIdFromEntropySize(10); // 16 characters long

		await db.insert(userTable).values({
			id: userId,
			email,
			username,
			passwordHash,
			role: 'SUPER_ADMIN'
		});
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		ctx.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		const { websiteName, domain } = input;

		const { ok, data } = await umami.createWebsite({
			name: websiteName,
			domain
		});

		if (!ok || !data)
			return {
				success: false,
				error: 'Failed to create analytics profile'
			};

		await db.insert(sitesTable).values({
			id: generateIdFromEntropySize(10),
			name: websiteName,
			domain,
			umamiId: data.id,
			ownerId: userId
		});

		return {
			success: true
		};
	});
