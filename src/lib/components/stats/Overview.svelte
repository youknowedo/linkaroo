<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';
	import type { WebsiteStats } from '../../../app';

	let overview: WebsiteStats | null = null;

	const camelCaseToWords = (s: string) => {
		const result = s.replace(/([A-Z])/g, ' $1');
		return result.charAt(0).toUpperCase() + result.slice(1);
	};

	onMount(async () => {
		const { success, error, stats } = await trpc($page).analytics.overview.query();

		if (!success) return console.error('Failed to fetch analytics overview', error);

		overview = stats ?? null;
	});
</script>

<div class="grid grid-cols-3">
	<div class="col-span-2 grid grid-cols-5">
		<div class="flex flex-col items-center justify-center p-4">
			<h4>Views</h4>
			<p class="text-3xl font-bold">{overview?.views.value}</p>
			<div>
				{#if overview}
					{overview.views.prev / overview.views.value || 0 * 100}%
				{/if}
			</div>
		</div>
		<div class="flex flex-col items-center justify-center p-4">
			<h4>Visits</h4>
			<p class="text-3xl font-bold">{overview?.visits.value}</p>
			<div>
				{#if overview}
					{overview.visits.prev / overview.visits.value || 0 * 100}%
				{/if}
			</div>
		</div>
		<div class="flex flex-col items-center justify-center p-4">
			<h4>Visitors</h4>
			<p class="text-3xl font-bold">{overview?.visitors.value}</p>
			<div>
				{#if overview}
					{overview.visitors.prev / overview.visitors.value || 0 * 100}%
				{/if}
			</div>
		</div>
		<div class="flex flex-col items-center justify-center p-4">
			<h4>BounceRate</h4>
			<p class="text-3xl font-bold">{overview?.bounceRate.value}%</p>
			<div>
				{#if overview}
					{overview.bounceRate.prev / overview.bounceRate.value || 0 * 100}%
				{/if}
			</div>
		</div>
		<div class="flex flex-col items-center justify-center p-4">
			<h4>VisitDuration</h4>
			<p class="text-3xl font-bold">{overview?.visitDuration.value}s</p>
			<div>
				{#if overview}
					{overview.visitDuration.prev / overview.visitDuration.value || 0 * 100}%
				{/if}
			</div>
		</div>
	</div>

	<div></div>
</div>
