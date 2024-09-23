<script lang="ts">
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 3;
	export let text: string;
</script>

{#if level === 1}
	<h1 class="heading">{text}</h1>
{:else if level === 2}
	<h2 class="heading">{text}</h2>
{:else if level === 3}
	<h3 class="heading">{text}</h3>
{:else if level === 4}
	<h4 class="heading">{text}</h4>
{:else if level === 5}
	<h5 class="heading">{text}</h5>
{:else if level === 6}
	<h6 class="heading">{text}</h6>
{/if}
