<script lang="ts">
	import type { Profile } from '$lib/builder';

	export let edit: boolean;
	export let data: Profile;
	export let onInput: (data: Profile) => void;
</script>

<div class="profile">
	<!-- TODO: Edit image -->
	<img src={data.image} alt={data.name} />
	<div>
		<h2>
			{#if edit}
				<textarea
					placeholder="Name"
					bind:value={data.name}
					on:input={(e) => ((data.name = e.currentTarget.value), onInput(data))}
				/>
			{:else}
				{data.name}
			{/if}
		</h2>
		<p>
			{#if edit}
				<textarea
					placeholder="Bio"
					bind:value={data.bio}
					on:input={(e) => ((data.bio = e.currentTarget.value), onInput(data))}
				/>
			{:else}
				{data.bio}
			{/if}
		</p>
	</div>
</div>
