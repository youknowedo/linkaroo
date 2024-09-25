import type { Block } from "$lib/builder";
import { lucia } from "$lib/server/auth";
import { db } from "$lib/server/db/client";
import { pagesTable, sitesTable } from "$lib/server/db/schema";
import { t, type Res } from "$lib/trpc";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { z } from "zod";

export const pages = t.router({
	slugTaken: t.procedure
		.input(
			z.object({
				slug: z.string()
			})
		)
		.query(async ({ ctx, input }): Promise<Res<{ taken: boolean }>> => {
			const sessionId = ctx.cookies.get(lucia.sessionCookieName);
			if (!sessionId)
				return {
					success: false,
					error: "No session found"
				};

			const { user } = await lucia.validateSession(sessionId);

			if (!user)
				return {
					success: false,
					error: "No user found"
				};

			const { slug } = input;

			const page = (await db.select().from(pagesTable).where(eq(pagesTable.slug, slug)))[0];

			return {
				success: true,
				taken: !!page
			};
		}),
	create: t.procedure
		.input(
			z.object({
				siteId: z.string().optional(),
				name: z.string(),
				slug: z.string()
			})
		)
		.mutation(async ({ ctx, input }): Promise<Res<{ id: string }>> => {
			const sessionId = ctx.cookies.get(lucia.sessionCookieName);
			if (!sessionId)
				return {
					success: false,
					error: "No session found"
				};

			const { user } = await lucia.validateSession(sessionId);

			if (!user)
				return {
					success: false,
					error: "No user found"
				};

			const { name, slug } = input;
			let { siteId } = input;

			if (!siteId) {
				// TODO: Make non owners of the site be able to view
				const site = (
					await db
						.select({ id: sitesTable.umamiId })
						.from(sitesTable)
						.where(eq(sitesTable.ownerId, user.id))
				)[0];

				siteId = site.id;
			}

			const id = generateIdFromEntropySize(10);

			try {
				await db.insert(pagesTable).values({
					id,
					siteId,
					name,
					slug
				});

				return {
					success: true,
					id
				};
			} catch (e) {
				return {
					success: false,
					error: JSON.stringify(e)
				};
			}
		}),
	multiple: t.procedure
		.input(
			z
				.object({
					siteId: z.string().optional(),
					amount: z.number().optional(),
					offset: z.number().optional()
				})
				.optional()
		)
		.query(
			async ({
				ctx,
				input
			}): Promise<
				Res<{
					pages: {
						id: string;
						name: string;
						slug: string;
						blocks: Block[];
					}[];
				}>
			> => {
				const sessionId = ctx.cookies.get(lucia.sessionCookieName);
				if (!sessionId)
					return {
						success: false,
						error: "No session found"
					};

				const { user } = await lucia.validateSession(sessionId);

				if (!user)
					return {
						success: false,
						error: "No user found"
					};

				const { amount, offset } = input ?? {};
				let siteId = input?.siteId;

				if (!siteId) {
					// TODO: Make non owners of the site be able to view
					const site = (
						await db
							.select({ id: sitesTable.umamiId })
							.from(sitesTable)
							.where(eq(sitesTable.ownerId, user.id))
					)[0];

					siteId = site.id;
				}

				const pages = await db
					.select()
					.from(pagesTable)
					.where(eq(pagesTable.siteId, siteId))
					.limit(amount ?? 10)
					.offset(offset ?? 0);

				return {
					success: true,
					pages: pages.map((page) => ({
						...page,
						blocks: page.blocks as Block[]
					}))
				};
			}
		),
	delete: t.procedure
		.input(
			z.object({
				id: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const sessionId = ctx.cookies.get(lucia.sessionCookieName);
			if (!sessionId)
				return {
					success: false,
					error: "No session found"
				};

			const { user } = await lucia.validateSession(sessionId);

			if (!user)
				return {
					success: false,
					error: "No user found"
				};

			const { id } = input;

			await db.delete(pagesTable).where(eq(pagesTable.id, id));

			return {
				success: true
			};
		})
});
