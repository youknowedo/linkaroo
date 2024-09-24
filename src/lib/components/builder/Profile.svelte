<script lang="ts">
	import type { Profile } from '$lib/builder';

	export let edit: boolean;
	export let data: Profile;
</script>

<div class="profile">
	<!-- TODO: Edit image -->
	<img src={data.image} alt={data.name} />
	<div>
		<h2
			placeholder="Name"
			contenteditable={edit}
			on:input={(e) => (data.name = e.currentTarget.innerText)}
		>
			{data.name}
		</h2>
		<p
			placeholder="Bio"
			contenteditable={edit}
			on:input={(e) => (data.bio = e.currentTarget.innerText)}
		>
			{data.bio}
		</p>
	</div>
</div>
