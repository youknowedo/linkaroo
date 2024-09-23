<script lang="ts">
	export let name: string;
	export let image: string;
	export let description: string;
</script>

<div class="profile">
	<img src={image} alt={name} />
	<h2>{name}</h2>
	<p>{description}</p>
</div>
