<script lang="ts">
	let className = '';
	export { className as class };

	export let height: number;
	export let src: string;
	export let alt: string;
	export let text: string | undefined;
</script>

<div class={className}>
	<img {src} {alt} style="height: {height}px;" />

	{#if text}
		<div>
			<p>
				{text}
			</p>
		</div>
	{/if}
</div>
