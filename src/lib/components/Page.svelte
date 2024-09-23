<script lang="ts">
	import type { Builder } from '$lib/builder';
	import Heading from './builder/Heading.svelte';
	import Image from './builder/Image.svelte';
	import Link from './builder/Link.svelte';
	import Paragraph from './builder/Paragraph.svelte';
	import Profile from './builder/Profile.svelte';

	export let builder: Builder;
</script>

{#each builder.blocks as block}
	{#if block.type === 'profile'}
		<Profile {...block} />
	{:else if block.type === 'heading'}
		<Heading {...block} />
	{:else if block.type === 'paragraph'}
		<Paragraph {...block} />
	{:else if block.type === 'link'}
		<Link {...block} />
	{:else if block.type === 'image'}
		<Image {...block} />
	{/if}
{/each}
