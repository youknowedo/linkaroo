<script lang="ts">
	import CircleUser from "lucide-svelte/icons/circle-user";
	import Menu from "lucide-svelte/icons/menu";
	import Package2 from "lucide-svelte/icons/package-2";
	import Search from "lucide-svelte/icons/search";

	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Header from "$lib/components/dashboard/Header.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Input } from "$lib/components/ui/input";
	import * as Sheet from "$lib/components/ui/sheet";
	import { navItems } from "$lib/stores";
</script>

<div class="flex min-h-screen w-full flex-col">
	<Header />

	<main class="flex-1 bg-muted/40">
		<slot />
	</main>
</div>
