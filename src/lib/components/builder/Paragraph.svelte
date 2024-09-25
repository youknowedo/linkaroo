<script lang="ts">
	import type { Paragraph } from "$lib/builder";

	export let edit: boolean;
	export let data: Paragraph;
	export let onInput: (data: Paragraph) => void;
</script>

<p
	placeholder="This is a paragraph"
	contenteditable={edit}
	on:input={(e) => ((data.text = e.currentTarget.innerText), onInput(data))}
	class="paragraph"
>
	{data.text}
</p>
