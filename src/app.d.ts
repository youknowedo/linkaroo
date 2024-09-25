import type { Session, User } from "lucia";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export type WebsiteStats = {
	visits: Stat;
	visitors: Stat;
	views: Stat;
	visitDuration: Stat;
	bounceRate: Stat;
};

export type Stat = {
	value: number;
	prev: number;
};
