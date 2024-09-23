<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	import { page } from '$app/stores';
	import { showCharts } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';
	import { year } from 'drizzle-orm/mysql-core';
	import { onMount } from 'svelte';
	import type { WebsiteStats } from '../../../../app';
	import { Button } from '../../ui/button';
	import * as Select from '../../ui/select';
	import Separator from '../../ui/separator/separator.svelte';
	import { Skeleton } from '../../ui/skeleton';

	type Range = {
		from: number | (() => number);
		to: number | (() => number);
	};
	type SelectItem =
		| {
				label: string;
				value: number;
		  }
		| undefined;

	const ranges: Range[] = [
		// Today
		{
			from: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
			to: new Date(new Date().setHours(23, 59, 59, 999)).getTime()
		},
		// Last 24 hours
		{
			from: new Date(Date.now() - 24 * 60 * 60 * 1000).getTime(),
			to: Date.now()
		},
		// This week
		{
			from: () =>
				new Date(
					new Date().setDate(new Date().getDate() - new Date().getDay() + time * 7)
				).getTime(),
			to: () =>
				new Date(
					new Date().setDate(new Date().getDate() - new Date().getDay() + time * 7 + 6)
				).getTime()
		},
		// Last 7 days
		{
			from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime(),
			to: Date.now()
		},
		// This month
		{
			from: () => new Date(new Date().getFullYear(), new Date().getMonth() - time, 1).getTime(),
			to: () => new Date(new Date().getFullYear(), new Date().getMonth() - time + 1, 0).getTime()
		},
		// Last 30 days
		{
			from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime(),
			to: Date.now()
		},
		// Last 90 days
		{
			from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).getTime(),
			to: Date.now()
		},
		// This year
		{
			from: () => new Date(new Date().getFullYear() - time, 0, 1).getTime(),
			to: () => new Date(new Date().getFullYear() - time, 11, 31).getTime()
		},
		// Last 6 months
		{
			from: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).getTime(),
			to: Date.now()
		},
		// Last 12 months
		{
			from: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000).getTime(),
			to: Date.now()
		}
	];
	const items: SelectItem[] = [
		{ label: 'Today', value: 0 },
		{ label: 'Last 24 hours', value: 1 },
		undefined,
		{ label: 'This week', value: 2 },
		{ label: 'Last 7 days', value: 3 },
		undefined,
		{ label: 'This month', value: 4 },
		{ label: 'Last 30 days', value: 5 },
		{ label: 'Last 90 days', value: 6 },
		undefined,
		{ label: 'This year', value: 7 },
		{ label: 'Last 6 months', value: 8 },
		{ label: 'Last 12 months', value: 9 }
	];

	let stats: WebsiteStats | null = null;
	let time = 0;
	let selected: SelectItem = items[0];
	let selectedRange: Range = ranges[0];
	let originalLabel = items[0]?.label;

	const onTimeChange = async () => {
		if (!selectedRange) return;

		stats = null;

		const rawFrom =
			typeof selectedRange.from === 'number' ? selectedRange.from : selectedRange.from();
		const rawTo = typeof selectedRange.to === 'number' ? selectedRange.to : selectedRange.to();

		const timeRange = rawTo - rawFrom;

		const from = typeof selectedRange.from === 'number' ? rawFrom - timeRange * time : rawFrom;
		const to = typeof selectedRange.from === 'number' ? rawTo - timeRange * time : rawTo;

		const {
			success,
			error,
			stats: s
		} = await trpc($page).analytics.overview.query({
			from,
			to
		});
		if (!success) return console.error('Failed to fetch analytics overview', error);

		stats = s ?? null;

		selected = selected && {
			label:
				time == 0
					? (originalLabel ?? '')
					: `${new Date(from).toLocaleDateString(undefined, {
							hour: 'numeric',
							minute: 'numeric',
							day: 'numeric',
							month: 'short'
						})} - ${new Date(to).toLocaleDateString(undefined, {
							day: 'numeric',
							month: 'short'
						})}`,
			value: selected.value ?? 0
		};
	};

	onMount(async () => {
		if (!selectedRange) return;

		const {
			success,
			error,
			stats: s
		} = await trpc($page).analytics.overview.query({
			from: typeof selectedRange.from === 'number' ? selectedRange.from : selectedRange.from(),
			to: typeof selectedRange.to === 'number' ? selectedRange.to : selectedRange.to()
		});

		if (!success) return console.error('Failed to fetch analytics overview', error);

		stats = s ?? null;
	});
</script>

<div class="grid grid-cols-3">
	<div class="col-span-2 grid grid-cols-5">
		<div class="stat">
			<h4>Views</h4>
			<p>
				{#if stats}
					{stats.views.value}
				{:else}
					<Skeleton class="h-10 w-12" />
				{/if}
			</p>
			<div class="tag">
				{#if stats}
					{(stats.views.prev / stats.views.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-6 w-7" />
				{/if}
			</div>
		</div>
		<div class="stat">
			<h4>Visits</h4>
			<p>
				{#if stats}
					{stats.views.value}
				{:else}
					<Skeleton class="h-10 w-12" />
				{/if}
			</p>
			<div class="tag">
				{#if stats}
					{(stats.visits.prev / stats.visits.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-6 w-7" />
				{/if}
			</div>
		</div>
		<div class="stat">
			<h4>Visitors</h4>
			<p>
				{#if stats}
					{stats.views.value}
				{:else}
					<Skeleton class="h-10 w-12" />
				{/if}
			</p>
			<div class="tag">
				{#if stats}
					{(stats.visitors.prev / stats.visitors.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-6 w-7" />
				{/if}
			</div>
		</div>
		<div class="stat">
			<h4>Bounce Rate</h4>
			<p>
				{#if stats}
					{stats.views.value}%
				{:else}
					<Skeleton class="h-10 w-12" />
				{/if}
			</p>
			<div class="tag">
				{#if stats}
					{(stats.bounceRate.prev / stats.bounceRate.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-6 w-7" />
				{/if}
			</div>
		</div>
		<div class="stat">
			<h4>Visit Duration</h4>
			<p>
				{#if stats}
					{stats.views.value}s
				{:else}
					<Skeleton class="h-10 w-12" />
				{/if}
			</p>
			<div class="tag">
				{#if stats}
					{(stats.visitDuration.prev / stats.visitDuration.value || 0 * 100) | 0}%
				{:else}
					<Skeleton class="h-6 w-7" />
				{/if}
			</div>
		</div>
	</div>

	<div class="flex items-center justify-end gap-2">
		<Select.Root
			bind:selected
			onSelectedChange={async (r) => {
				if (!r) return;
				selectedRange = ranges[r.value];
				originalLabel = r.label;

				if (!selectedRange) return;

				stats = null;

				const {
					success,
					error,
					stats: s
				} = await trpc($page).analytics.overview.query({
					from: typeof selectedRange.from === 'number' ? selectedRange.from : selectedRange.from(),
					to: typeof selectedRange.to === 'number' ? selectedRange.to : selectedRange.to()
				});
				if (!success) return console.error('Failed to fetch analytics overview', error);

				stats = s ?? null;
				time = 0;
			}}
		>
			<Select.Trigger class="w-fit min-w-[180px]">
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				{#each items as item}
					{#if item}
						<Select.Item value={item.value}>{item.label}</Select.Item>
					{:else}
						<Separator />
					{/if}
				{/each}
			</Select.Content>
		</Select.Root>

		<div>
			<Button variant="outline" class="p-2" on:click={() => (time++, onTimeChange())}>
				<ChevronLeft />
			</Button>

			<Button
				variant="outline"
				class="p-2"
				disabled={time == 0}
				on:click={() => (time--, onTimeChange())}
			>
				<ChevronRight />
			</Button>
		</div>
	</div>
</div>

{#if $showCharts}
	Chart
{/if}

<style>
	.stat {
		@apply flex flex-col items-start gap-3;
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
