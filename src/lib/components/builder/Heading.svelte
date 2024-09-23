<script lang="ts">
	let className = '';
	export { className as class };

	export let level: 1 | 2 | 3 | 4 | 5 | 6;
	export let text: string;
</script>

{#if level === 1}
	<h1 class={className}>{text}</h1>
{:else if level === 2}
	<h2 class={className}>{text}</h2>
{:else if level === 3}
	<h3 class={className}>{text}</h3>
{:else if level === 4}
	<h4 class={className}>{text}</h4>
{:else if level === 5}
	<h5 class={className}>{text}</h5>
{:else if level === 6}
	<h6 class={className}>{text}</h6>
{/if}
