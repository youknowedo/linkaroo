<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";

	import { Label } from "$lib/components/ui/label";
	import { trpc } from "$lib/trpc/client";

	let auth = {
		email: "",
		username: "",
		password: "",
		passwordConfirmation: ""
	};
	let site: {
		websiteName: string;
	} | null = null;

	const validateAuth = () => {
		if (auth.password !== auth.passwordConfirmation) {
			alert("Passwords do not match");
			return;
		}

		// TODO: Username length & email validation

		site = { websiteName: "" };
	};

	const submit = async (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		e.preventDefault();

		if (!site) return alert("Site not found");

		const { success, error } = await trpc($page).setup.mutate({
			...auth,
			...site,
			domain: window.location.origin
		});

		if (!success) return alert(error);
		else goto("/dashboard");
	};
</script>

<div class="grid gap-2 text-center">
	<h1 class="text-3xl font-bold">Setup admin</h1>
	<p class="text-balance text-muted-foreground">Enter your email below to login to your account</p>
</div>
{#if !site}
	<form class="grid gap-4" on:submit={validateAuth}>
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="m@example.com" required bind:value={auth.email} />
		</div>
		<div class="grid gap-2">
			<Label for="username">Username</Label>
			<Input id="username" type="text" placeholder="jvbsucks" required bind:value={auth.username} />
		</div>
		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input id="password" type="password" required bind:value={auth.password} />
		</div>
		<div class="grid gap-2">
			<Label for="confirm_password">Confirm Password</Label>
			<Input
				id="confirm_password"
				type="password"
				required
				bind:value={auth.passwordConfirmation}
			/>
		</div>

		<Button type="submit" class="w-full">Next</Button>
	</form>
{:else}
	<form class="grid gap-4" on:submit={submit}>
		<div class="grid gap-2">
			<Label for="name">Site Name</Label>
			<Input id="name" type="text" required bind:value={site.websiteName} />
		</div>

		<Button type="submit" class="w-full">Setup Linkaroo</Button>
	</form>
{/if}
