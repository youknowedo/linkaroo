<script lang="ts">
	export let height: number = 300;
	export let text: string | undefined = undefined;

	export let src: string;
	export let alt: string;
</script>

<div class="image">
	<img {src} {alt} style="height: {height}px;" />

	{#if text}
		<div>
			<p>
				{text}
			</p>
		</div>
	{/if}
</div>
