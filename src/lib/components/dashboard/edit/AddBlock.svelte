<script lang="ts">
	import { blockTypes } from '$lib/builder';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { builder, selectedBlockId } from '$lib/stores';
	import { Plus } from 'lucide-svelte';

	export let dialogOpen: boolean;
	export let at: number;
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger
		class="relative -my-2 flex h-4 w-full items-center justify-center opacity-0 hover:opacity-100"
		on:click={() => (dialogOpen = true)}
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
					on:click={() =>
						builder.update((b) => {
							b.add(block.type, at);

							selectedBlockId.set(b.blocks[at]._id);
							dialogOpen = false;
							return b;
						})}
				>
					<svelte:component this={block.icon} />
					{block.type.charAt(0).toUpperCase() + block.type.slice(1)}
				</Button>
			{/each}
		</div>
	</Dialog.Content>
</Dialog.Root>
