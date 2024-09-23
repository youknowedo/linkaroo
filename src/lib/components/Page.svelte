<script lang="ts">
	import './Page.default.css';

	import type { Builder } from '$lib/builder';
	import Heading from './builder/Heading.svelte';
	import Image from './builder/Image.svelte';
	import Link from './builder/Link.svelte';
	import Paragraph from './builder/Paragraph.svelte';
	import Profile from './builder/Profile.svelte';

	export let builder: Builder;
	export let styles: string | undefined = undefined;
</script>

<div id="page" class={styles ? '' : 'default'}>
	{#each builder.blocks as block}
		{#if block.class === 'profile'}
			<Profile {...block} />
		{:else if block.class === 'heading'}
			<Heading {...block} />
		{:else if block.class === 'paragraph'}
			<Paragraph {...block} />
		{:else if block.class === 'link'}
			<Link {...block} />
		{:else if block.class === 'image'}
			{#if block.href}
				<a href={block.href}>
					<Image {...block} />
				</a>
			{:else}
				<Image {...block} />
			{/if}
		{/if}
	{/each}
</div>
