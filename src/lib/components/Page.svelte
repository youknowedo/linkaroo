<script lang="ts">
	import { blockTypes, Builder, type Block as TBlock } from '$lib/builder';
	import * as Dialog from '$lib/components/ui/dialog';
	import { builder, selectedBlockId } from '$lib/stores';
	import Plus from 'lucide-svelte/icons/plus';
	import { onMount } from 'svelte';
	import Block from './Block.svelte';
	import './Page.default.css';
	import { Button } from './ui/button';

	export let edit = false;
	export let styles: string | undefined = undefined;

	let styleTag: HTMLStyleElement;
	$: newBlockOpen = $builder.blocks.map(() => ({
		open: false
	}));

	const onInput = (data: TBlock['data']) => {
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			block.data = data;
			return b;
		});
	};

	const add = (type: Block['type'], at: number) =>
		builder.update((b) => {
			b.add(type, at);

			selectedBlockId.set(b.blocks[at]._id);
			return b;
		});

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
	{#each $builder.blocks as block, i}
		{#if edit}
			<button
				id={block._id}
				class="editable {$selectedBlockId === block._id ? 'selected' : ''}"
				on:click={() => selectedBlockId.set(block._id)}
			>
				<Block {onInput} {edit} {block} />
			</button>

			<Dialog.Root bind:open={newBlockOpen[i].open}>
				<Dialog.Trigger
					class="relative -my-2 flex h-4 w-full items-center justify-center opacity-0 hover:opacity-100"
					on:click={() => (newBlockOpen[i].open = true)}
				>
					<div class="absolute h-0.5 w-full bg-red-500" />
					<div class="z-10 rounded-full bg-red-500 text-white">
						<Plus />
					</div>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Create a new Block</Dialog.Title>
					</Dialog.Header>

					<div class="grid grid-cols-3 gap-2">
						{#each blockTypes as block}
							<Button
								variant="outline"
								class="flex h-auto items-center justify-start gap-2 py-4"
								on:click={() => add(block.type, i + 1)}
							>
								<svelte:component this={block.icon} />
								{block.type.charAt(0).toUpperCase() + block.type.slice(1)}
							</Button>
						{/each}
					</div>
				</Dialog.Content>
			</Dialog.Root>
		{:else}
			<Block {onInput} {edit} {block} />
		{/if}
	{/each}
</div>
