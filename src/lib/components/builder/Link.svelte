<script lang="ts">
	import type { Link } from '$lib/builder';

	export let edit: boolean;
	export let data: Link;
</script>

<a href={edit ? undefined : data.href} class="link">
	<div>
		<!-- TODO: Edit image -->
		{#if data.image}
			<img src={data.image} alt="favicon" />
		{/if}

		<div>
			<h4
				placeholder="Link text"
				contenteditable={edit}
				on:input={(e) => (data.heading = e.currentTarget.innerText)}
			>
				{data.heading}
			</h4>

			<p
				placeholder="Subtext"
				contenteditable={edit}
				on:input={(e) => (data.subtext = e.currentTarget.innerText)}
			>
				{data.subtext ?? ''}
			</p>
		</div>
	</div>
</a>
