<script lang="ts">
	let className = '';
	export { className as class };

	export let name: string;
	export let image: string;
	export let description: string;
</script>

<div class={className}>
	<img src={image} alt={name} />
	<h2>{name}</h2>
	<p>{description}</p>
</div>
