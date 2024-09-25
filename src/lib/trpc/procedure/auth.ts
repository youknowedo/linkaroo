import { lucia } from "$lib/server/auth";
import { db } from "$lib/server/db/client";
import { userTable } from "$lib/server/db/schema/auth";
import { t, type Res } from "$lib/trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

const { verify } = await import("@node-rs/argon2");

export const auth = t.router({
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
						error: "Invalid email or password"
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
					error: "Invalid email or password"
				};
			}

			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			ctx.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: "/",
				...sessionCookie.attributes
			});

			return {
				success: true
			};
		})
});
