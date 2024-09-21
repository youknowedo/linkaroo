<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import { Label } from '$lib/components/ui/label';
	import { trpc } from '$lib/trpc/client';

	let email = '';
	let username = '';
	let password = '';
	let passwordConfirmation = '';

	const submit = async (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		e.preventDefault();

		const { success, error } = await trpc($page).auth.setup.mutate({
			email,
			username,
			password,
			passwordConfirmation
		});

		if (!success) return alert(error);
		else goto('/dashboard');
	};
</script>

<div class="grid gap-2 text-center">
	<h1 class="text-3xl font-bold">Setup admin</h1>
	<p class="text-balance text-muted-foreground">Enter your email below to login to your account</p>
</div>
<form class="grid gap-4" on:submit={submit}>
	<div class="grid gap-2">
		<Label for="email">Email</Label>
		<Input id="email" type="email" placeholder="m@example.com" required bind:value={email} />
	</div>
	<div class="grid gap-2">
		<Label for="username">Username</Label>
		<Input id="username" type="text" placeholder="jvbsucks" required bind:value={username} />
	</div>
	<div class="grid gap-2">
		<Label for="password">Password</Label>
		<Input id="password" type="password" required bind:value={password} />
	</div>
	<div class="grid gap-2">
		<Label for="confirm_password">Confirm Password</Label>
		<Input id="confirm_password" type="password" required bind:value={passwordConfirmation} />
	</div>
	<Button type="submit" class="w-full">Signup</Button>
</form>
<div class="mt-4 text-center text-sm">
	Don&apos;t have an account?
	<button on:click={() => goto('login')} class="underline"> Login </button>
</div>
