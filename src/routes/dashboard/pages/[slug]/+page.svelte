<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import { Builder } from '$lib/builder';
	import HeadingPanel from '$lib/components/dashboard/edit/panels/HeadingPanel.svelte';
	import ImagePanel from '$lib/components/dashboard/edit/panels/ImagePanel.svelte';
	import LinkPanel from '$lib/components/dashboard/edit/panels/LinkPanel.svelte';
	import ParagraphPanel from '$lib/components/dashboard/edit/panels/ParagraphPanel.svelte';
	import ProfilePanel from '$lib/components/dashboard/edit/panels/ProfilePanel.svelte';
	import Header from '$lib/components/dashboard/Header.svelte';
	import Page from '$lib/components/Page.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Resizable from '$lib/components/ui/resizable';
	import * as Select from '$lib/components/ui/select';
	import { titleType } from '$lib/db/schema';
	import { builder, selectedBlockId } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';

	$: selectedBlock = $selectedBlockId !== null ? $builder.find($selectedBlockId) : undefined;

	$: selectedTitleType = $builder.titleType
		? {
				label: $builder.titleType
					.replace(/([A-Z])/g, ' $1')
					.replace(/^./, (str) => str.toUpperCase()),
				value: $builder.titleType
			}
		: undefined;

	onMount(async () => {
		const {
			success,
			error,
			page: p
		} = await trpc($page).pages.single.query({
			slug: $page.params.slug
		});

		if (success && p) {
			builder.set(
				new Builder(p.blocks, {
					id: p.id,
					siteName: p.siteName ?? '',
					name: p.name,
					slug: p.slug,
					titleType: p.titleType
				})
			);
		} else console.error(error);
	});
</script>

<Header>
	<Button
		on:click={async () => {
			await trpc($page).pages.update.mutate({
				...$builder,
				id: $builder.id
			});

			pushState('/dashboard/pages/' + $builder.slug, { replace: true });
		}}
	>
		Save
	</Button>
</Header>

<div class="h-[calc(100vh-4rem)]">
	<Resizable.PaneGroup direction="horizontal">
		<Resizable.Pane class="flex h-full w-64 flex-col bg-background p-4" defaultSize={25}>
			<div class="flex h-full flex-col justify-between">
				{#if selectedBlock}
					<div class="flex flex-col gap-2">
						<h3 class="text-lg font-bold">
							{selectedBlock.type.charAt(0).toUpperCase()}{selectedBlock.type.slice(1)}
						</h3>

						{#if selectedBlock?.type === 'profile'}
							<ProfilePanel {selectedBlock} />
						{:else if selectedBlock.type === 'heading'}
							<HeadingPanel {selectedBlock} />
						{:else if selectedBlock.type === 'paragraph'}
							<ParagraphPanel {selectedBlock} />
						{:else if selectedBlock.type === 'link'}
							<LinkPanel {selectedBlock} />
						{:else if selectedBlock.type === 'image'}
							<ImagePanel {selectedBlock} />
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
				{:else if $builder.name && $builder.slug}
					<div class="flex flex-col gap-2">
						<h3 class="text-lg font-bold">{$builder.name}</h3>

						<Label for="name">Name</Label>
						<Input
							id="name"
							type="text"
							bind:value={$builder.name}
							on:input={(e) =>
								builder.update((b) => {
									b.name = e.currentTarget.value;
									return b;
								})}
						/>

						<Label for="name">Title Type</Label>
						<Select.Root
							selected={selectedTitleType}
							onSelectedChange={(v) => {
								v && ($builder.titleType = v.value);
							}}
						>
							<Select.Trigger id="">
								<Select.Value placeholder="Select a verified email to display" />
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="both" label="Both" />
								<Select.Item value="siteOnly" label="Site Only" />
								<Select.Item value="pageOnly" label="Page Only" />
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$builder.titleType} />

						{#if $builder.slug !== 'home'}
							<Label for="slug">Slug</Label>
							<Input
								id="slug"
								type="text"
								bind:value={$builder.slug}
								on:input={(e) =>
									builder.update((b) => {
										b.slug = e.currentTarget.value;
										return b;
									})}
								on:focusout={(e) =>
									(e.currentTarget.value = encodeURIComponent(
										e.currentTarget.value.toLowerCase().replace(/ /g, '-')
									))}
							/>
						{/if}
					</div>
				{/if}
			</div>
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
