<script lang="ts">
	import ChartArea from 'lucide-svelte/icons/chart-area';

	import { Button } from '$lib/components/ui/button';

	import Header from '$lib/components/dashboard/Header.svelte';
	import Overview from '$lib/components/dashboard/stats/Overview.svelte';
	import { showCharts } from '$lib/stores';
</script>

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
