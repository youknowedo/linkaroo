<script lang="ts">
	import { isHeading, isImage, isLink, isParagraph, isProfile } from '$lib/builder';
	import Page from '$lib/components/Page.svelte';
	import { blocks, selectedBlockIndex } from '$lib/stores';
</script>

<div class="flex h-[calc(100vh-4rem)]">
	<div class="h-full w-64 border-r bg-background">
		{#if $selectedBlockIndex !== null}
			{#if $blocks[$selectedBlockIndex].type === 'profile'}
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.image}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isProfile(block.data)) return b;

							block.data.image = e.currentTarget.value;
							return b;
						})}
				/>
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.name}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isProfile(block.data)) return b;

							block.data.name = e.currentTarget.value;
							return b;
						})}
				/>
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.bio}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isProfile(block.data)) return b;

							block.data.bio = e.currentTarget.value;
							return b;
						})}
				/>
			{:else if $blocks[$selectedBlockIndex].type === 'heading'}
				<!-- TODO: Level -->
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.text}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isHeading(block.data)) return b;

							block.data.text = e.currentTarget.value;
							return b;
						})}
				/>
			{:else if $blocks[$selectedBlockIndex].type === 'paragraph'}
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.text}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isParagraph(block.data)) return b;

							block.data.text = e.currentTarget.value;
							return b;
						})}
				/>
			{:else if $blocks[$selectedBlockIndex].type === 'link'}
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.href}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isLink(block.data)) return b;

							block.data.href = e.currentTarget.value;
							return b;
						})}
				/>
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.heading}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isLink(block.data)) return b;

							block.data.heading = e.currentTarget.value;
							return b;
						})}
				/>
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.image}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isLink(block.data)) return b;

							block.data.image = e.currentTarget.value;
							return b;
						})}
				/>
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.subtext}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isLink(block.data)) return b;

							block.data.subtext = e.currentTarget.value;
							return b;
						})}
				/>
			{:else if $blocks[$selectedBlockIndex].type === 'image'}
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.src}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isImage(block.data)) return b;

							block.data.src = e.currentTarget.value;
							return b;
						})}
				/>
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.alt}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isImage(block.data)) return b;

							block.data.alt = e.currentTarget.value;
							return b;
						})}
				/>
				<input
					type="number"
					bind:value={$blocks[$selectedBlockIndex].data.height}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isImage(block.data)) return b;

							block.data.height = +e.currentTarget.value;
							return b;
						})}
				/>
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.text}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isImage(block.data)) return b;

							block.data.text = e.currentTarget.value;
							return b;
						})}
				/>
				<input
					type="text"
					bind:value={$blocks[$selectedBlockIndex].data.href}
					on:input={(e) =>
						blocks.update((b) => {
							const block = b[$selectedBlockIndex];
							if (!isImage(block.data)) return b;

							block.data.text = e.currentTarget.value;
							return b;
						})}
				/>
			{/if}
		{/if}
	</div>

	<div class="flex-1 overflow-scroll">
		<Page edit blocks={$blocks} />
	</div>
</div>
