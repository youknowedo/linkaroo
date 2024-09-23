<script lang="ts">
	import drums from '$lib/assets/drums.jpg';

	import { Builder } from '$lib/builder';
	import Page from '$lib/components/Page.svelte';
</script>

<Page
	builder={new Builder()
		.addProfile('Sigfredo', drums, "Hello I'm Sigfredo, yeehaaw")
		.addLink('https://google.com', "It's a link", undefined, 'tf is this link bro')
		.addLink('https://google.com', "It's another link")
		.addImage(drums, 'Drummer boi', 'https://spotofy.com', 'Drummer Album')
		.addHeading('Heading')
		.addParagraph(
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quidem ullam sint aliquid esse assumenda quibusdam nemo libero non et a possimus? Quo ratione officiis odit quaerat eius, maiores culpa.'
		)}
/>
