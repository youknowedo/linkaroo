<script lang="ts">
	import Plus from "lucide-svelte/icons/plus";

	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Title from "$lib/components/dashboard/Title.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import { trpc } from "$lib/trpc/client";
	import { pgEnum } from "drizzle-orm/pg-core";
	import { onMount } from "svelte";

	type Page = Exclude<
		Awaited<ReturnType<ReturnType<typeof trpc>["pages"]["multiple"]["query"]>>["pages"],
		undefined
	>[number];

	let pages: Page[] | undefined = undefined;

	let dialogOpen = false;
	let newPage: Omit<Page, "id"> = {
		name: "",
		slug: "",
		blocks: []
	};

	onMount(async () => {
		const { success, pages: p, error } = await trpc($page).pages.multiple.query();

		if (success) {
			pages = p;
		} else console.log(error);
	});

	const deletePage = async (id: string) => {
		await trpc($page).pages.delete.mutate({ id });
	};
</script>

<div class="container max-w-[calc(100vw-4rem)] md:p-10">
	<Title>
		<div>
			<Dialog.Root bind:open={dialogOpen}>
				<Dialog.Trigger>
					<Button class="-m-px p-2" variant="outline">
						<Plus />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Create a new Page</Dialog.Title>
					</Dialog.Header>

					<Label for="path">Slug</Label>
					<Input id="path" type="text" bind:value={newPage.slug} />
					<Label for="name">Name</Label>
					<Input id="name" type="text" bind:value={newPage.name} />

					<Dialog.Footer>
						<Button
							on:click={async () => {
								dialogOpen = false;
								const { success, error } = await trpc($page).pages.create.mutate(newPage);

								if (success) {
									newPage = {
										name: "",
										slug: "",
										blocks: []
									};
								} else console.log(error);
							}}>Create</Button
						>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</Title>

	<div class="flex flex-col gap-2">
		{#if pages}
			{#each pages as page}
				<Card.Root>
					<Card.Content class="flex h-20 items-center justify-between py-0">
						<Card.Title>
							{page.name}
							<span class="text-sm italic text-muted-foreground">
								(/{page.slug})
							</span>
						</Card.Title>

						<div>
							<Button variant="outline" on:click={() => goto("pages/" + page.slug)}>Edit</Button>
							{#if page.slug !== "home"}
								<Button variant="destructive" on:click={() => deletePage(page.id)}>Delete</Button>
							{/if}
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		{:else}
			<Skeleton class="h-20 w-full" />
			<Skeleton class="h-20 w-full" />
			<Skeleton class="h-20 w-full" />
		{/if}
	</div>
</div>
