import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { Router } from '../../hooks.server';

let browserClient: ReturnType<typeof createTRPCClient<Router>>;

export function trpc(init?: TRPCClientInit) {
	const isBrowser = typeof window !== 'undefined';
	if (isBrowser && browserClient) return browserClient;
	const client = createTRPCClient<Router>({ init });
	if (isBrowser) browserClient = client;
	return client;
}
