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
			<p
				placeholder="Image text"
				contenteditable={edit}
				on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))}
			>
				{data.text}
			</p>
		</div>
	{/if}
</div>
