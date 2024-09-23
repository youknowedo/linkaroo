<script lang="ts">
	import drums from '$lib/assets/drums.jpg';

	import { Builder } from '$lib/builder';
	import Page from '$lib/components/Page.svelte';
</script>

<Page
	builder={new Builder()
		.addProfile('Sigfredo', drums, "Hello I'm Sigfredo, yeehaaw")
		.addHeading('Heading')
		.addParagraph('Lorem ipsum')
		.addLink('https://google.com', "It's a link", undefined, 'tf is this link bro')
		.addImage(drums, 'Drummer boi')}
/>
