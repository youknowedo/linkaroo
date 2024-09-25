<script lang="ts">
	import { isLink, type Link } from '$lib/builder';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { builder, selectedBlockId } from '$lib/stores';

	export let selectedBlock: { data: Link };
</script>

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

			if (!isLink(block.data)) return b;

			block.data.href = e.currentTarget.value;
			return b;
		})}
/>
<Label for="heading">Heading</Label>
<Input
	id="heading"
	type="text"
	bind:value={selectedBlock.data.heading}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isLink(block.data)) return b;

			block.data.heading = e.currentTarget.value;
			return b;
		})}
/>
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

			if (!isLink(block.data)) return b;

			block.data.image = e.currentTarget.value;
			return b;
		})}
/>
<Label for="subtext">Subtext</Label>
<Input
	id="subtext"
	type="text"
	bind:value={selectedBlock.data.subtext}
	on:input={(e) =>
		builder.update((b) => {
			if ($selectedBlockId === null) return b;

			const block = b.find($selectedBlockId);
			if (!block) return b;

			if (!isLink(block.data)) return b;

			block.data.subtext = e.currentTarget.value;
			return b;
		})}
/>
