import type { RequestEvent } from "@sveltejs/kit";
import type { inferAsyncReturnType } from "@trpc/server";
import { initTRPC } from "@trpc/server";

export async function createContext(event: RequestEvent) {
	return {
		...event
	};
}

export type Res<T = unknown> = {
	success: boolean;
	error?: string;
} & Partial<T>;

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
