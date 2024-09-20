import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db/client';
import { userTable } from '$lib/server/db/schema/auth';
import { t } from '$lib/trpc';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { z } from 'zod';

const { hash, verify } = await import('@node-rs/argon2');

export type Res<T = unknown> = {
	success: boolean;
	error?: string;
} & Partial<T>;

export const auth = t.router({
	signup: t.procedure
		.input(
			z.object({
				email: z.string().email(),
				username: z.string().min(3).max(20),
				password: z.string().min(8),
				passwordConfirmation: z.string().min(8)
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

			try {
				await db.insert(userTable).values({
					id: userId,
					email,
					username,
					passwordHash
				});

				const session = await lucia.createSession(userId, {});
				const sessionCookie = lucia.createSessionCookie(session.id);

				ctx.setHeaders({
					'Set-Cookie': sessionCookie.serialize()
				});

				return {
					success: true
				};
			} catch {
				return {
					success: false,
					error: 'Email already used'
				};
			}
		}),
	login: t.procedure
		.input(
			z.object({
				emailOrUsername: z.string(),
				password: z.string()
			})
		)
		.mutation(async ({ ctx, input }): Promise<Res> => {
			let user: { id: string; passwordHash: string };

			const userFromEmail = (
				await db.select().from(userTable).where(eq(userTable.email, input.emailOrUsername))
			)[0];

			if (userFromEmail) user = userFromEmail;
			else {
				const userFromUsername = (
					await db.select().from(userTable).where(eq(userTable.username, input.emailOrUsername))
				)[0];

				if (!userFromUsername)
					return {
						success: false,
						error: 'Invalid email or password'
					};

				user = userFromUsername;
			}

			const validPassword = await verify(user.passwordHash, input.password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});
			if (!validPassword) {
				return {
					success: false,
					error: 'Invalid email or password'
				};
			}

			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			ctx.setHeaders({
				'Set-Cookie': sessionCookie.serialize()
			});

			return {
				success: true
			};
		})
});
