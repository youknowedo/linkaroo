<script lang="ts">
	import type { Heading } from '$lib/builder';
	import { selectedBlockId } from '$lib/stores';

	export let edit: boolean;
	export let data: Heading;
	export let onInput: (data: Heading) => void;

	if (!data.level) data.level = 3;
</script>

{#if data.level === 1}
	<h1 class="heading">
		{#if edit}
			<textarea
				placeholder="Heading text"
				bind:value={data.text}
				on:input={(e) => ((data.text = e.currentTarget.value), onInput(data))}
			/>
		{:else}
			{data.text}
		{/if}
	</h1>
{:else if data.level === 2}
	<h2 on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))} class="heading">
		{#if edit}
			<textarea
				placeholder="Heading text"
				bind:value={data.text}
				on:input={(e) => ((data.text = e.currentTarget.value), onInput(data))}
			/>
		{:else}
			{data.text}
		{/if}
	</h2>
{:else if data.level === 3}
	<h3 on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))} class="heading">
		{#if edit}
			<textarea
				placeholder="Heading text"
				bind:value={data.text}
				on:input={(e) => ((data.text = e.currentTarget.value), onInput(data))}
			/>
		{:else}
			{data.text}
		{/if}
	</h3>
{:else if data.level === 4}
	<h4 on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))} class="heading">
		{#if edit}
			<textarea
				placeholder="Heading text"
				bind:value={data.text}
				on:input={(e) => ((data.text = e.currentTarget.value), onInput(data))}
			/>
		{:else}
			{data.text}
		{/if}
	</h4>
{:else if data.level === 5}
	<h5 on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))} class="heading">
		{#if edit}
			<textarea
				placeholder="Heading text"
				bind:value={data.text}
				on:input={(e) => ((data.text = e.currentTarget.value), onInput(data))}
			/>
		{:else}
			{data.text}
		{/if}
	</h5>
{:else if data.level === 6}
	<h6 on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))} class="heading">
		{#if edit}
			<textarea
				placeholder="Heading text"
				bind:value={data.text}
				on:input={(e) => ((data.text = e.currentTarget.value), onInput(data))}
			/>
		{:else}
			{data.text}
		{/if}
	</h6>
{/if}
