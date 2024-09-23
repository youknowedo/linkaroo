<script>
	import { page } from '$app/stores';
	import { navItems } from '$lib/stores';
</script>

<div class="flex items-center justify-between">
	<h1 class="pb-8 text-3xl font-bold">
		{$navItems.find(({ href }) =>
			href === '/dashboard'
				? $page.url.pathname === '/dashboard'
				: $page.url.pathname.startsWith(href)
		)?.name}
	</h1>

	<slot />
</div>
