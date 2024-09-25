<script lang="ts">
	import { page } from "$app/stores";
	import { Builder, isHeading, isImage, isLink, isParagraph, isProfile } from "$lib/builder";
	import Header from "$lib/components/dashboard/Header.svelte";
	import Page from "$lib/components/Page.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Resizable from "$lib/components/ui/resizable";
	import { builder, selectedBlockId } from "$lib/stores";
	import { trpc } from "$lib/trpc/client";

	$: selectedBlock = $selectedBlockId !== null ? $builder.find($selectedBlockId) : undefined;
</script>

<Header>
	<Button>Save</Button>
</Header>

<div class="h-[calc(100vh-4rem)]">
	<Resizable.PaneGroup direction="horizontal">
		<Resizable.Pane
			class="flex h-full w-64 flex-col gap-2 border-r bg-background p-4"
			defaultSize={25}
		>
			{#if selectedBlock}
				<div class="flex h-full flex-col justify-between">
					<div>
						<h3 class="text-lg font-bold">
							{selectedBlock.type.charAt(0).toUpperCase()}{selectedBlock.type.slice(1)}
						</h3>

						{#if selectedBlock?.type === "profile"}
							<Label for="image">Image</Label>
							<Input
								id="image"
								type="text"
								bind:value={selectedBlock.data.image}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isProfile(block.data)) return b;

										block.data.image = e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="name">Name</Label>
							<Input
								id="name"
								type="text"
								bind:value={selectedBlock.data.name}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isProfile(block.data)) return b;

										block.data.name = e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="bio">Bio</Label>
							<Input
								id="bio"
								type="text"
								bind:value={selectedBlock.data.bio}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isProfile(block.data)) return b;

										block.data.bio = e.currentTarget.value;
										return b;
									})}
							/>
						{:else if selectedBlock.type === "heading"}
							<!-- TODO: Level -->
							<Label for="level">Level</Label>
							<Input
								id="level"
								type="text"
								bind:value={selectedBlock.data.text}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isHeading(block.data)) return b;

										block.data.text = e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="text">Text</Label>
							<Input
								id="text"
								type="text"
								bind:value={selectedBlock.data.text}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isHeading(block.data)) return b;

										block.data.text = e.currentTarget.value;
										return b;
									})}
							/>
						{:else if selectedBlock.type === "paragraph"}
							<Label for="text">Text</Label>
							<Input
								id="text"
								type="text"
								bind:value={selectedBlock.data.text}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isParagraph(block.data)) return b;

										block.data.text = e.currentTarget.value;
										return b;
									})}
							/>
						{:else if selectedBlock.type === "link"}
							<Label for="href">Link</Label>
							<Input
								id="href"
								type="text"
								bind:value={selectedBlock.data.href}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isLink(block.data)) return b;

										block.data.href = e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="heading">Heading</Label>
							<Input
								id="heading"
								type="text"
								bind:value={selectedBlock.data.heading}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isLink(block.data)) return b;

										block.data.heading = e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="image">Image</Label>
							<Input
								id="image"
								type="text"
								bind:value={selectedBlock.data.image}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isLink(block.data)) return b;

										block.data.image = e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="subtext">Subtext</Label>
							<Input
								id="subtext"
								type="text"
								bind:value={selectedBlock.data.subtext}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isLink(block.data)) return b;

										block.data.subtext = e.currentTarget.value;
										return b;
									})}
							/>
						{:else if selectedBlock.type === "image"}
							<Label for="src">Image</Label>
							<Input
								id="src"
								type="text"
								bind:value={selectedBlock.data.src}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isImage(block.data)) return b;

										block.data.src = e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="alt">Alt</Label>
							<Input
								id="alt"
								type="text"
								bind:value={selectedBlock.data.alt}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isImage(block.data)) return b;

										block.data.alt = e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="height">Height</Label>
							<Input
								id="height"
								type="number"
								bind:value={selectedBlock.data.height}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isImage(block.data)) return b;

										block.data.height = +e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="text">Text</Label>
							<Input
								id="text"
								type="text"
								bind:value={selectedBlock.data.text}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isImage(block.data)) return b;

										block.data.text = e.currentTarget.value;
										return b;
									})}
							/>
							<Label for="href">Link</Label>
							<Input
								id="href"
								type="text"
								bind:value={selectedBlock.data.href}
								on:input={(e) =>
									builder.update((b) => {
										if ($selectedBlockId === null) return b;

										const block = b.find($selectedBlockId);
										if (!block) return b;

										if (!isImage(block.data)) return b;

										block.data.text = e.currentTarget.value;
										return b;
									})}
							/>
						{/if}
					</div>

					<Button
						class="w-full"
						variant="destructive"
						on:click={() => (
							builder.update((b) => b.delete(selectedBlock._id)), selectedBlockId.set(null)
						)}
					>
						Delete
					</Button>
				</div>
			{/if}
		</Resizable.Pane>
		<Resizable.Handle />
		<Resizable.Pane defaultSize={75}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="h-[calc(100vh-4rem)] overflow-scroll"
				on:click={(e) => {
					if (e.currentTarget === e.target) selectedBlockId.set(null);
				}}
			>
				<Page edit />
			</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
