<script lang="ts">
	import type { Link } from '$lib/builder';

	export let edit: boolean;
	export let data: Link;
	export let onInput: (data: Link) => void;
</script>

<a href={edit ? undefined : data.href} class="link">
	<!-- TODO: Edit image -->
	{#if data.image}
		<img src={data.image} alt="favicon" />
	{/if}

	<div>
		<h4>
			{#if edit}
				<textarea
					placeholder="Link text"
					bind:value={data.heading}
					on:input={(e) => ((data.heading = e.currentTarget.value), onInput(data))}
				/>
			{:else}
				{data.heading}
			{/if}
		</h4>

		<p>
			{#if edit}
				<textarea
					placeholder="Subtext"
					bind:value={data.subtext}
					on:input={(e) => ((data.subtext = e.currentTarget.value), onInput(data))}
				/>
			{:else}
				{data.subtext}
			{/if}
		</p>
	</div>
</a>
