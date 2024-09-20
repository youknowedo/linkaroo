<script lang="ts">
	import drums from '$lib/assets/drums.jpg';
</script>

<div class="h-screen w-full lg:grid lg:grid-cols-2">
	<div class="flex h-full items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<slot />
		</div>
	</div>
	<div class="hidden bg-muted lg:block">
		<img
			src={drums}
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
