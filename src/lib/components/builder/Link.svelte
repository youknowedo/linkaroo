<script lang="ts">
	let className = '';
	export { className as class };

	export let href: string;
	export let heading: string;
	export let image: string | undefined = undefined;
	export let description: string | undefined = undefined;
</script>

<a {href} class={className}>
	<div>
		{#if image}
			<img src={image} alt="favicon" />
		{/if}

		<div>
			<h4>{heading}</h4>
			{#if description}
				<p>{description}</p>
			{/if}
		</div>
	</div>
</a>
