import { BlockSchema, type Block } from "$lib/builder";
import { db } from "$lib/db/client";
import { pagesTable, sitesTable } from "$lib/db/schema";
import { lucia } from "$lib/server/auth";
import { t, type Res } from "$lib/trpc";
import { eq, type InferSelectModel } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { z } from "zod";

export type TPage = InferSelectModel<typeof pagesTable> & { blocks: Block[] };

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
					pages: TPage[];
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
	single: t.procedure
		.input(
			z.union([
				z.object({
					id: z.string(),
					siteId: z.string().optional()
				}),
				z.object({
					slug: z.string(),
					siteId: z.string().optional()
				})
			])
		)
		.query(
			async ({
				ctx,
				input
			}): Promise<
				Res<{
					page: TPage;
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

				let page: InferSelectModel<typeof pagesTable>;
				if ("id" in input)
					page = (await db.select().from(pagesTable).where(eq(pagesTable.id, input.id)))[0];
				else page = (await db.select().from(pagesTable).where(eq(pagesTable.slug, input.slug)))[0];

				return {
					success: true,
					page: {
						...page,
						blocks: page.blocks as Block[]
					}
				};
			}
		),

	update: t.procedure
		.input(
			z.object({
				id: z.string(),
				blocks: z.array(BlockSchema)
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

			const { id, blocks } = input;

			await db.update(pagesTable).set({ blocks }).where(eq(pagesTable.id, id));

			return {
				success: true
			};
		}),
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
