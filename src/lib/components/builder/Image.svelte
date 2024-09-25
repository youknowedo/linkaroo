<script lang="ts">
	import type { Image } from '$lib/builder';

	export let edit: boolean;
	export let data: Image;
	export let onInput: (data: Image) => void;
</script>

<!-- TODO: Edit image -->
<div class="image">
	<img src={data.src} alt={data.alt} style="height: {data.height}px;" />

	{#if edit || data.text}
		<div>
			<p>
				{#if edit}
					<textarea
						placeholder="Image text"
						bind:value={data.text}
						on:input={(e) => ((data.text = e.currentTarget.value), onInput(data))}
					/>
				{:else}
					{data.text}
				{/if}
			</p>
		</div>
	{/if}
</div>
