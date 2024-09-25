<script lang="ts">
	import type { Paragraph } from '$lib/builder';

	export let edit: boolean;
	export let data: Paragraph;
	export let onInput: (data: Paragraph) => void;
</script>

<p class="paragraph">
	{#if edit}
		<textarea
			placeholder="This is a paragraph"
			bind:value={data.text}
			on:input={(e) => ((data.text = e.currentTarget.value), onInput(data))}
		/>
	{:else}
		{data.text}
	{/if}
</p>
