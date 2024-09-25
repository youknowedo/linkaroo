import { readable, writable } from "svelte/store";
import { Builder } from "./builder";

export const navItems = readable<{ name: string; href: string }[]>([
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "Pages", href: "/dashboard/pages" },
	{ name: "Analytics", href: "/dashboard/analytics" },
	{ name: "Settings", href: "/dashboard/settings" }
]);

export const showCharts = writable(true);

export const builder = writable<Builder>(new Builder());
export const selectedBlockId = writable<string | null>(null);
