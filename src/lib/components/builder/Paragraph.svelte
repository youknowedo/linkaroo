<script lang="ts">
	import type { Paragraph } from '$lib/builder';

	export let edit: boolean;
	export let data: Paragraph;
</script>

<p
	placeholder="This is a paragraph"
	contenteditable={edit}
	on:input={(e) => (data.text = e.currentTarget.innerText)}
	class="paragraph"
>
	{data.text}
</p>
