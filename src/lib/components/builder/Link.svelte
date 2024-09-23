<script lang="ts">
	export let href: string;
	export let heading: string;
	export let image: string | undefined = undefined;
	export let description: string | undefined = undefined;
</script>

<a {href}>
	<div>
		<img
			src={image ?? `https://s2.googleusercontent.com/s2/favicons?domain=${new URL(href).host}`}
			alt="favicon"
		/>

		<div>
			<h4>{heading}</h4>
			{#if description}
				<p>{description}</p>
			{/if}
		</div>
	</div>
</a>
