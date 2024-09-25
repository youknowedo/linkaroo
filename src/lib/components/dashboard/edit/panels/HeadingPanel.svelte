<script lang="ts">
	import { isHeading, type Heading } from '$lib/builder';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { builder, selectedBlockId } from '$lib/stores';

	export let selectedBlock: { data: Heading };
</script>

<!-- TODO: Level -->
<Label for="level">Level</Label>
<Input
	id="level"
	type="text"
	bind:value={selectedBlock.data.level}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isHeading(block.data)) return b;

			block.data.level = e.currentTarget.value;
			return b;
		})}
/>
<Label for="text">Text</Label>
<Input
	id="text"
	type="text"
	bind:value={selectedBlock.data.text}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isHeading(block.data)) return b;

			block.data.text = e.currentTarget.value;
			return b;
		})}
/>
