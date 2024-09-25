<script lang="ts">
	import { blockTypes, Builder, type Block as TBlock } from "$lib/builder";
	import * as Dialog from "$lib/components/ui/dialog";
	import { builder, selectedBlockId } from "$lib/stores";
	import Plus from "lucide-svelte/icons/plus";
	import { onMount } from "svelte";
	import Block from "./Block.svelte";
	import AddBlock from "./dashboard/edit/AddBlock.svelte";
	import "./Page.default.css";
	import { Button } from "./ui/button";

	export let edit = false;
	export let styles: string | undefined = undefined;

	let styleTag: HTMLStyleElement;
	let dialogOpen = false;
	$: newBlockOpen = $builder.blocks.map(() => false);

	const onInput = (data: TBlock["data"]) => {
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			block.data = data;
			return b;
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

<div id="page" class={styles ? "" : "default"}>
	{#if edit}
		<AddBlock {dialogOpen} at={0} />
	{/if}

	{#each $builder.blocks as block, i}
		{#if edit}
			<button
				id={block._id}
				class="editable {$selectedBlockId === block._id ? 'selected' : ''}"
				on:click={() => selectedBlockId.set(block._id)}
			>
				<Block {onInput} {edit} {block} />
			</button>

			<AddBlock dialogOpen={newBlockOpen[i]} at={i + 1} />
		{:else}
			<Block {onInput} {edit} {block} />
		{/if}
	{/each}
</div>
