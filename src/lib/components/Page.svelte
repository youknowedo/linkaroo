<script lang="ts">
	import './Page.default.css';

	import type { Builder } from '$lib/builder';
	import { onMount } from 'svelte';
	import Heading from './builder/Heading.svelte';
	import Image from './builder/Image.svelte';
	import Link from './builder/Link.svelte';
	import Paragraph from './builder/Paragraph.svelte';
	import Profile from './builder/Profile.svelte';

	export let builder: Builder;
	export let edit = false;
	export let styles: string | undefined = undefined;

	let styleTag: HTMLStyleElement;

	onMount(() => {
		if (styles) {
			styleTag.innerHTML = styles;
		}
	});
</script>

<svelte:head>
	{#if styles}
		<style bind:this={styleTag}></style>
	{/if}
</svelte:head>

<div id="page" class={styles ? '' : 'default'}>
	{#each builder.blocks as block}
		{#if block.type === 'profile'}
			<Profile {edit} {...block} />
		{:else if block.type === 'heading'}
			<Heading {edit} {...block} />
		{:else if block.type === 'paragraph'}
			<Paragraph {edit} {...block} />
		{:else if block.type === 'link'}
			<Link {edit} {...block} />
		{:else if block.type === 'image'}
			{#if !edit && block.data.href}
				<a href={block.data.href}>
					<Image edit={false} {...block} />
				</a>
			{:else}
				<Image {edit} {...block} />
			{/if}
		{/if}
	{/each}
</div>
