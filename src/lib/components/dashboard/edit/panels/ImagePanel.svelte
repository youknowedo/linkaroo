<script lang="ts">
	import { isImage, type Image } from '$lib/builder';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { builder, selectedBlockId } from '$lib/stores';

	export let selectedBlock: { data: Image };
</script>

<Label for="src">Image</Label>
<Input
	id="src"
	type="text"
	bind:value={selectedBlock.data.src}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isImage(block.data)) return b;

			block.data.src = e.currentTarget.value;
			return b;
		})}
/>
<Label for="alt">Alt</Label>
<Input
	id="alt"
	type="text"
	bind:value={selectedBlock.data.alt}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isImage(block.data)) return b;

			block.data.alt = e.currentTarget.value;
			return b;
		})}
/>
<Label for="height">Height</Label>
<Input
	id="height"
	type="number"
	bind:value={selectedBlock.data.height}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isImage(block.data)) return b;

			block.data.height = +e.currentTarget.value;
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

			if (!isImage(block.data)) return b;

			block.data.text = e.currentTarget.value;
			return b;
		})}
/>
<Label for="href">Link</Label>
<Input
	id="href"
	type="text"
	bind:value={selectedBlock.data.href}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isImage(block.data)) return b;

			block.data.text = e.currentTarget.value;
			return b;
		})}
/>
