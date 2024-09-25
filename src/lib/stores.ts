import { readable, writable } from "svelte/store";
import { Builder } from "./builder";

export const navItems = readable<{ name: string; href: string }[]>([
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "Pages", href: "/dashboard/pages" },
	{ name: "Analytics", href: "/dashboard/analytics" },
	{ name: "Settings", href: "/dashboard/settings" }
]);

export const showCharts = writable(true);

export const builder = writable<Builder>(
	new Builder()
		.addProfile({
			name: "John Doe",
			image: "/favicon.png",
			bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quidem ullam sint aliquid esse assumenda quibusdam nemo libero non et a possimus?"
		})
		.addLink({
			href: "https://google.com",
			heading: "It's a link",
			subtext: "tf is this link"
		})
		.addLink({
			href: "https://google.com",
			heading: "It's another link"
		})
		.addImage({
			src: "/favicon.png",
			alt: "Drums",
			text: "Drums are cool",
			height: 300
		})
		.addHeading({
			text: "Hello, world!"
		})
		.addParagraph({
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quidem ullam sint aliquid esse assumenda quibusdam nemo libero non et a possimus?"
		})
		.addLink({
			href: "https://google.com",
			heading: "Yet another link",
			subtext: "tf is this link"
		})
);
export const selectedBlockId = writable<string | null>(null);
