<script lang="ts">
	import { isHeading, isImage, isLink, isParagraph, isProfile } from '$lib/builder';
	import Page from '$lib/components/Page.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { blocks, selectedBlockIndex } from '$lib/stores';
</script>

<div class="flex h-[calc(100vh-4rem)]">
	<div class="flex h-full w-64 flex-col gap-2 border-r bg-background p-4">
		{#if $selectedBlockIndex !== null}
			<h3 class="text-lg font-bold">
				{$blocks[$selectedBlockIndex].type.charAt(0).toUpperCase() +
					$blocks[$selectedBlockIndex].type.slice(1)}
			</h3>

			{#if $blocks[$selectedBlockIndex].type === 'profile'}
				<Label for="image">Image</Label>
				<Input
					id="image"
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
				<Label for="name">Name</Label>
				<Input
					id="name"
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
				<Label for="bio">Bio</Label>
				<Input
					id="bio"
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
				<Label for="level">Level</Label>
				<Input
					id="level"
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
				<Label for="text">Text</Label>
				<Input
					id="text"
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
				<Label for="text">Text</Label>
				<Input
					id="text"
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
				<Label for="href">Link</Label>
				<Input
					id="href"
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
				<Label for="heading">Heading</Label>
				<Input
					id="heading"
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
				<Label for="image">Image</Label>
				<Input
					id="image"
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
				<Label for="subtext">Subtext</Label>
				<Input
					id="subtext"
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
				<Label for="src">Image</Label>
				<Input
					id="src"
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
				<Label for="alt">Alt</Label>
				<Input
					id="alt"
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
				<Label for="height">Height</Label>
				<Input
					id="height"
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
				<Label for="text">Text</Label>
				<Input
					id="text"
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
				<Label for="href">Link</Label>
				<Input
					id="href"
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

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="flex-1 overflow-scroll"
		on:click={(e) => {
			if (e.currentTarget === e.target) selectedBlockIndex.set(null);
		}}
	>
		<Page edit blocks={$blocks} />
	</div>
</div>
