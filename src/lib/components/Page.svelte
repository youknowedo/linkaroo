<script lang="ts">
	import type { Block as TBlock } from '$lib/builder';
	import { blocks as b, selectedBlockIndex } from '$lib/stores';
	import { onMount } from 'svelte';
	import Block from './Block.svelte';
	import './Page.default.css';

	export let blocks: TBlock[];
	export let edit = false;
	export let styles: string | undefined = undefined;

	let styleTag: HTMLStyleElement;

	const onInput = (data: TBlock['data']) => {
		b.update((blocks) => {
			if ($selectedBlockIndex === null) return blocks;

			blocks[$selectedBlockIndex].data = data;
			return blocks;
		});
	};

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
	{#each blocks as block}
		{#if edit}
			<button
				class={$selectedBlockIndex === $b?.findIndex((b) => block === b) ? 'selected' : ''}
				on:click={() => selectedBlockIndex.set($b?.findIndex((b) => block === b))}
			>
				<Block {onInput} {edit} {block} />
			</button>
		{:else}
			<Block {onInput} {edit} {block} />
		{/if}
	{/each}
</div>
