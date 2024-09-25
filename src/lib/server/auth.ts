import { dev } from "$app/environment";
import { sessionTable, userTable } from "$lib/server/db/schema/auth";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { redirect, type Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { Cookie, Lucia } from "lucia";
import { db } from "./db/client";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
		};
	}
}

export const createAuthHandle =
	(): Handle =>
	async ({ event, resolve }) => {
		const setupCompleted =
			(await db.select({}).from(userTable).where(eq(userTable.role, "SUPER_ADMIN"))).length > 0;

		if (!setupCompleted) {
			if (event.url.pathname !== "/setup") {
				redirect(302, "/setup");
			}

			event.locals.user = null;
			event.locals.session = null;
			return resolve(event);
		}

		const sessionId = event.cookies.get(lucia.sessionCookieName);
		if (!sessionId) {
			event.locals.user = null;
			event.locals.session = null;
			return resolve(event);
		}

		const { session, user } = await lucia.validateSession(sessionId);

		let sessionCookie: Cookie | null = null;

		if (session && session.fresh) sessionCookie = lucia.createSessionCookie(session.id);
		if (!session) sessionCookie = lucia.createBlankSessionCookie();

		if (sessionCookie)
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});

		event.locals.user = user;
		event.locals.session = session;
		return resolve(event);
	};
