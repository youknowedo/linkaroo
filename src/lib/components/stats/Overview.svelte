<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';
	import type { WebsiteStats } from '../../../app';
	import { Skeleton } from '../ui/skeleton';

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
		<div class="stat">
			<h4>Views</h4>
			<p>
				{#if overview}
					{overview.views.value}
				{/if}
			</p>
			<div class="tag">
				{#if overview}
					{(overview.views.prev / overview.views.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-7 w-8" />
				{/if}
			</div>
		</div>
		<div class="stat">
			<h4>Visits</h4>
			<p>
				{#if overview}
					{overview.views.value}
				{/if}
			</p>
			<div class="tag">
				{#if overview}
					{(overview.visits.prev / overview.visits.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-7 w-8" />
				{/if}
			</div>
		</div>
		<div class="stat">
			<h4>Visitors</h4>
			<p>
				{#if overview}
					{overview.views.value}
				{/if}
			</p>
			<div class="tag">
				{#if overview}
					{(overview.visitors.prev / overview.visitors.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-7 w-8" />
				{/if}
			</div>
		</div>
		<div class="stat">
			<h4>Bounce Rate</h4>
			<p>
				{#if overview}
					{overview.views.value}%
				{/if}
			</p>
			<div class="tag">
				{#if overview}
					{(overview.bounceRate.prev / overview.bounceRate.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-7 w-8" />
				{/if}
			</div>
		</div>
		<div class="stat">
			<h4>Visit Duration</h4>
			<p>
				{#if overview}
					{overview.views.value}s
				{/if}
			</p>
			<div class="tag">
				{#if overview}
					{(overview.visitDuration.prev / overview.visitDuration.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-7 w-8" />
				{/if}
			</div>
		</div>
	</div>

	<div></div>
</div>

<style>
	.stat {
		@apply flex flex-col items-start justify-center gap-2;
	}
	.stat > h4 {
		@apply whitespace-nowrap font-bold text-muted-foreground;
	}
	.stat > p {
		@apply text-4xl font-bold;
	}
	.stat > .tag {
		@apply rounded-md bg-muted px-2 py-0.5 text-muted-foreground;
	}
</style>
