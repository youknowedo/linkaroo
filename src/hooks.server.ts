import { createAuthHandle } from "$lib/server/auth";
import { analytics } from "$lib/trpc/procedure/analytics";
import { auth } from "$lib/trpc/procedure/auth";
import { pages } from "$lib/trpc/procedure/pages";
import { setup } from "$lib/trpc/procedure/setup";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { createTRPCHandle } from "trpc-sveltekit";
import { createContext, t } from "./lib/trpc";

const router = t.router({
	auth,
	analytics,
	setup,
	pages
});
export type Router = typeof router;

export const handle: Handle = sequence(
	createTRPCHandle({
		router,
		createContext
	}),
	createAuthHandle()
);
