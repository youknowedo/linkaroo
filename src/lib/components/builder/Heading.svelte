<script lang="ts">
	import type { Heading } from '$lib/builder';
	import { selectedBlockId } from '$lib/stores';

	export let edit: boolean;
	export let data: Heading;
	export let onInput: (data: Heading) => void;

	if (!data.level) data.level = 3;
</script>

{#if data.level === 1}
	<h1
		placeholder="Heading text"
		contenteditable={edit}
		on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))}
		class="heading"
	>
		{data.text}
	</h1>
{:else if data.level === 2}
	<h2
		placeholder="Heading text"
		contenteditable={edit}
		on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))}
		class="heading"
	>
		{data.text}
	</h2>
{:else if data.level === 3}
	<h3
		placeholder="Heading text"
		contenteditable={edit}
		on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))}
		class="heading"
	>
		{data.text}
	</h3>
{:else if data.level === 4}
	<h4
		placeholder="Heading text"
		contenteditable={edit}
		on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))}
		class="heading"
	>
		{data.text}
	</h4>
{:else if data.level === 5}
	<h5
		placeholder="Heading text"
		contenteditable={edit}
		on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))}
		class="heading"
	>
		{data.text}
	</h5>
{:else if data.level === 6}
	<h6
		placeholder="Heading text"
		contenteditable={edit}
		on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))}
		class="heading"
	>
		{data.text}
	</h6>
{/if}
