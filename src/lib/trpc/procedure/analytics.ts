import {
	UMAMI_API_CLIENT_ENDPOINT,
	UMAMI_API_CLIENT_SECRET,
	UMAMI_API_CLIENT_USER_ID
} from "$env/static/private";
import { db } from "$lib/db/client";
import { sitesTable } from "$lib/db/schema";
import { lucia } from "$lib/server/auth";
import { t, type Res } from "$lib/trpc";
import { getClient } from "@umami/api-client";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { WebsiteStats } from "../../../app";

export const umami = getClient({
	userId: UMAMI_API_CLIENT_USER_ID,
	secret: UMAMI_API_CLIENT_SECRET,
	apiEndpoint: UMAMI_API_CLIENT_ENDPOINT
});

export const analytics = t.router({
	overview: t.procedure
		.input(
			z
				.object({
					// websiteId: z.string() TODO: Add websiteId to input
					from: z.number().optional(),
					to: z.number().optional()
				})
				.optional()
		)
		.query(
			async ({
				ctx,
				input
			}): Promise<
				Res<{
					stats: WebsiteStats;
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

				// TODO: Make non owners of the site be able to view analytics
				const site = (
					await db
						.select({ id: sitesTable.umamiId })
						.from(sitesTable)
						.where(eq(sitesTable.ownerId, user.id))
				)[0];

				const { from, to } = input ?? {};

				const { ok, error, data } = await umami.getWebsiteStats(site.id, {
					startAt: from ?? new Date(Date.now() - 24 * 60 * 60 * 1000).getTime(),
					endAt: to ?? Date.now()
				});

				if (!ok || !data)
					return {
						success: false,
						error: error
					};

				return {
					success: true,
					stats: {
						visits: data.pageviews,
						visitors: data.visitors,
						views: data.pageviews,
						visitDuration: {
							value: data.totalTime?.value / data.visits?.value || 0,
							prev: data.totalTime?.prev / data.visits?.prev || 0
						},
						bounceRate: {
							value: data.bounces?.value / data.visitors?.value || 0,
							prev: data.bounces?.prev / data.visitors?.prev || 0
						}
					}
				};
			}
		)
});
