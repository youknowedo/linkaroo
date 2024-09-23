import { readable, writable } from 'svelte/store';

export const navItems = readable<{ name: string; href: string }[]>([
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Analytics', href: '/dashboard/analytics' },
	{ name: 'Settings', href: '/dashboard/settings' }
]);

export const showCharts = writable(true);
