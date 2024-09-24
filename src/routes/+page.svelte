<script lang="ts">
	import drums from '$lib/assets/drums.jpg';

	import { Builder } from '$lib/builder';
	import Page from '$lib/components/Page.svelte';
</script>

<Page
	blocks={new Builder()
		.addProfile({
			name: 'John Doe',
			image: drums,
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
			src: drums,
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
		}).blocks}
/>
