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
		{#if block.type === 'profile'}
			<Profile {...block.data} />
		{:else if block.type === 'heading'}
			<Heading {...block.data} />
		{:else if block.type === 'paragraph'}
			<Paragraph {...block.data} />
		{:else if block.type === 'link'}
			<Link {...block.data} />
		{:else if block.type === 'image'}
			{#if block.data.href}
				<a href={block.data.href}>
					<Image {...block.data} />
				</a>
			{:else}
				<Image {...block.data} />
			{/if}
		{/if}
	{/each}
</div>
