<script lang="ts">
	import { isParagraph, type Paragraph } from '$lib/builder';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { builder, selectedBlockId } from '$lib/stores';

	export let selectedBlock: { data: Paragraph };
</script>

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

			if (!isParagraph(block.data)) return b;

			block.data.text = e.currentTarget.value;
			return b;
		})}
/>
