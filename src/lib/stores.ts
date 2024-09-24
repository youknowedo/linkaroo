import { readable, writable } from 'svelte/store';
import { Builder, type Block } from './builder';

export const navItems = readable<{ name: string; href: string }[]>([
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Analytics', href: '/dashboard/analytics' },
	{ name: 'Settings', href: '/dashboard/settings' }
]);

export const showCharts = writable(true);

export const blocks = writable<Block[]>(
	new Builder()
		.addProfile({
			name: 'John Doe',
			image: '/favicon.png',
			bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quidem ullam sint aliquid esse assumenda quibusdam nemo libero non et a possimus?'
		})
		.addLink({
			href: 'https://google.com',
			heading: "It's a link",
			subtext: 'tf is this link'
		})
		.addLink({
			href: 'https://google.com',
			heading: "It's another link"
		})
		.addImage({
			src: '/favicon.png',
			alt: 'Drums',
			text: 'Drums are cool',
			height: 300
		})
		.addHeading({
			text: 'Hello, world!'
		})
		.addParagraph({
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quidem ullam sint aliquid esse assumenda quibusdam nemo libero non et a possimus?'
		})
		.addLink({
			href: 'https://google.com',
			heading: "It's a link",
			subtext: 'tf is this link'
		})
		.addLink({
			href: 'https://google.com',
			heading: "It's another link"
		}).blocks
);
export const selectedBlockIndex = writable<number | null>(null);
