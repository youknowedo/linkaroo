<script>
	import Header from '$lib/components/dashboard/Header.svelte';
	import Overview from '$lib/components/dashboard/stats/Overview.svelte';
	import { Button } from '$lib/components/ui/button';
	import { showCharts } from '$lib/stores';
	import ChartArea from 'lucide-svelte/icons/chart-area';
</script>

<div class="container md:p-10">
	<Header>
		<div>
			<Button
				class="p-2 {$showCharts ? '-m-px' : ''}"
				variant={$showCharts ? 'outline' : 'default'}
				on:click={() => showCharts.update((s) => !s)}
			>
				<ChartArea />
			</Button>
		</div>
	</Header>

	<Overview />
</div>
