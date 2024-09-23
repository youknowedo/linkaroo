<script lang="ts">
	let className = '';
	export { className as class };

	export let text: string;
</script>

<p class={className}>{text}</p>
