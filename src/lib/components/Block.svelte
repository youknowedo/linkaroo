<script lang="ts">
	import type { Block } from '$lib/builder';
	import Heading from './builder/Heading.svelte';
	import Image from './builder/Image.svelte';
	import Link from './builder/Link.svelte';
	import Paragraph from './builder/Paragraph.svelte';
	import Profile from './builder/Profile.svelte';

	export let edit: boolean;
	export let block: Block;
	export let onInput: (b: (typeof block)['data']) => void;
</script>

{#if block.type === 'profile'}
	<Profile {onInput} {edit} {...block} />
{:else if block.type === 'heading'}
	<Heading {onInput} {edit} {...block} />
{:else if block.type === 'paragraph'}
	<Paragraph {onInput} {edit} {...block} />
{:else if block.type === 'link'}
	<Link {onInput} {edit} {...block} />
{:else if block.type === 'image'}
	{#if !edit && block.data.href}
		<a href={block.data.href}>
			<Image {onInput} {edit} {...block} />
		</a>
	{:else}
		<Image {onInput} {edit} {...block} />
	{/if}
{/if}
