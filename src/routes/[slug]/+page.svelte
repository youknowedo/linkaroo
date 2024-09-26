<script lang="ts">
	import { page } from '$app/stores';
	import { Builder } from '$lib/builder';
	import Page from '$lib/components/Page.svelte';
	import { builder } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';

	onMount(async () => {
		const {
			success,
			error,
			page: p
		} = await trpc($page).pages.single.query({
			slug: $page.params.slug
		});

		console.log(p);

		if (success && p)
			builder.set(
				new Builder(p.blocks, {
					...p,
					siteName: p.siteName ?? ''
				})
			);
		else console.error(error);
	});
</script>

<Page />
