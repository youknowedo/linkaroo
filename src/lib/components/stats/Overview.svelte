<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { year } from 'drizzle-orm/mysql-core';
	import { onMount } from 'svelte';
	import type { WebsiteStats } from '../../../app';
	import { Button } from '../ui/button';
	import * as Select from '../ui/select';
	import Separator from '../ui/separator/separator.svelte';
	import { Skeleton } from '../ui/skeleton';

	type Range = {
		from: number;
		to: number;
		timeRange: number;
	};
	type SelectItem =
		| {
				label: string;
				value: Range;
		  }
		| undefined;

	// TODO: Remove timeRange and have a calc function to calculate the time range
	const ranges: SelectItem[] = [
		{
			label: 'Today',
			value: {
				from: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
				to: Date.now(),
				timeRange: 24 * 60 * 60 * 1000
			}
		},
		{
			label: 'Last 24 hours',
			value: {
				from: new Date(Date.now() - 24 * 60 * 60 * 1000).getTime(),
				to: Date.now(),
				timeRange: 24 * 60 * 60 * 1000
			}
		},
		undefined,
		{
			label: 'This Week',
			value: {
				from: new Date(
					new Date(
						new Date().setDate(new Date().getDate() - ((new Date().getDay() + 1) % 7))
					).setHours(0, 0, 0, 0)
				).getTime(),
				to: Date.now(),
				timeRange: 7 * 24 * 60 * 60 * 1000
			}
		},
		{
			label: 'Last 7 Days',
			value: {
				from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime(),
				to: Date.now(),
				timeRange: 7 * 24 * 60 * 60 * 1000
			}
		},
		undefined,
		{
			label: 'This Month',
			value: {
				from: new Date(
					new Date(new Date().getFullYear(), new Date().getMonth(), 1).setHours(0, 0, 0, 0)
				).getTime(),
				to: Date.now(),
				timeRange: 30 * 24 * 60 * 60 * 1000
			}
		},
		{
			label: 'Last 30 Days',
			value: {
				from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime(),
				to: Date.now(),
				timeRange: 30 * 24 * 60 * 60 * 1000
			}
		},
		{
			label: 'Last 90 Days',
			value: {
				from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).getTime(),
				to: Date.now(),
				timeRange: 90 * 24 * 60 * 60 * 1000
			}
		},
		undefined,
		{
			label: 'This Year',
			value: {
				from: new Date(new Date().getFullYear(), 0, 1).getTime(),
				to: Date.now(),
				timeRange: 365 * 24 * 60 * 60 * 1000
			}
		},
		{
			label: 'Last 6 Months',
			value: {
				from: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).getTime(),
				to: Date.now(),
				timeRange: 6 * 30 * 24 * 60 * 60 * 1000
			}
		},
		{
			label: 'Last 12 Months',
			value: {
				from: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000).getTime(),
				to: Date.now(),
				timeRange: 12 * 30 * 24 * 60 * 60 * 1000
			}
		}
	];

	let overview: WebsiteStats | null = null;
	let time = 0;
	let selectedRange: SelectItem = ranges[0];

	const onTimeChange = async () => {
		overview = null;

		const { success, error, stats } = await trpc($page).analytics.overview.query({
			from: selectedRange?.value.from,
			to: selectedRange?.value.to
		});
		if (!success) return console.error('Failed to fetch analytics overview', error);

		overview = stats ?? null;

		selectedRange = selectedRange && {
			label: `${new Date(selectedRange.value.from).toLocaleDateString(undefined, {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			})} - ${new Date(selectedRange.value.to).toLocaleDateString(undefined, {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			})}`,
			value: {
				from: selectedRange.value.from - time * selectedRange.value.timeRange,
				to: selectedRange.value.to - time * selectedRange.value.timeRange,
				timeRange: selectedRange.value.timeRange
			}
		};
	};

	onMount(async () => {
		const { success, error, stats } = await trpc($page).analytics.overview.query({
			from: selectedRange?.value.from,
			to: selectedRange?.value.to
		});

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
				{:else}
					<Skeleton class="h-10 w-12" />
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
				{:else}
					<Skeleton class="h-10 w-12" />
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
				{:else}
					<Skeleton class="h-10 w-12" />
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
				{:else}
					<Skeleton class="h-10 w-12" />
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
				{:else}
					<Skeleton class="h-10 w-12" />
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

	<div class="flex items-center justify-end gap-2">
		<Select.Root
			bind:selected={selectedRange}
			onSelectedChange={async () => {
				overview = null;

				const { success, error, stats } = await trpc($page).analytics.overview.query({
					from: selectedRange && selectedRange.value.from - time * selectedRange.value.timeRange,
					to: selectedRange && selectedRange.value.to - time * selectedRange.value.timeRange
				});
				if (!success) return console.error('Failed to fetch analytics overview', error);

				overview = stats ?? null;
			}}
		>
			<Select.Trigger class="w-fit min-w-[180px]">
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				{#each ranges as range}
					{#if range}
						<Select.Item value={range.value}>{range.label}</Select.Item>
					{:else}
						<Separator />
					{/if}
				{/each}
			</Select.Content>
		</Select.Root>

		<div>
			<Button variant="secondary" class="p-2" on:click={() => (time++, onTimeChange())}>
				<ChevronLeft />
			</Button>

			<Button
				variant="secondary"
				class="p-2"
				disabled={time == 0}
				on:click={() => (time--, onTimeChange())}
			>
				<ChevronRight />
			</Button>
		</div>
	</div>
</div>

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
