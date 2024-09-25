import { db } from "$lib/db/client";
import { userTable } from "$lib/db/schema";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }) => {
	const setupCompleted =
		(await db.select({}).from(userTable).where(eq(userTable.role, "SUPER_ADMIN"))).length > 0;

	if (!setupCompleted && url.pathname !== "/setup") return redirect(302, "/setup");
};
