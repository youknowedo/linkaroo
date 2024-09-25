<script lang="ts">
	import { isProfile, type Profile } from '$lib/builder';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { builder, selectedBlockId } from '$lib/stores';

	export let selectedBlock: { data: Profile };
</script>

<Label for="image">Image</Label>
<Input
	id="image"
	type="text"
	bind:value={selectedBlock.data.image}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isProfile(block.data)) return b;

			block.data.image = e.currentTarget.value;
			return b;
		})}
/>
<Label for="name">Name</Label>
<Input
	id="name"
	type="text"
	bind:value={selectedBlock.data.name}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isProfile(block.data)) return b;

			block.data.name = e.currentTarget.value;
			return b;
		})}
/>
<Label for="bio">Bio</Label>
<Input
	id="bio"
	type="text"
	bind:value={selectedBlock.data.bio}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isProfile(block.data)) return b;

			block.data.bio = e.currentTarget.value;
			return b;
		})}
/>
