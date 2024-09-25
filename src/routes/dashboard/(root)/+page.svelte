<script>
	import Title from "$lib/components/dashboard/Title.svelte";
	import Overview from "$lib/components/dashboard/stats/Overview.svelte";
	import { Button } from "$lib/components/ui/button";
	import { showCharts } from "$lib/stores";
	import ChartArea from "lucide-svelte/icons/chart-area";
</script>

<div class="container max-w-[calc(100vw-4rem)] md:p-10">
	<Title>
		<div>
			<Button
				class="p-2 {$showCharts ? '-m-px' : ''}"
				variant={$showCharts ? "outline" : "default"}
				on:click={() => showCharts.update((s) => !s)}
			>
				<ChartArea />
			</Button>
		</div>
	</Title>

	<Overview />
</div>
