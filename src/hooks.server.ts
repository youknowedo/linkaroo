import { createAuthHandle } from '$lib/server/auth';
import { auth } from '$lib/trpc/procedure/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { createContext, t } from './lib/trpc';

const router = t.router({
	auth
});
export type Router = typeof router;

export const handle: Handle = sequence(
	createTRPCHandle({
		router,
		createContext
	}),
	createAuthHandle()
);
