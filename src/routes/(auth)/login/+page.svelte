<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import { Label } from '$lib/components/ui/label';
	import { trpc } from '$lib/trpc/client';

	let emailOrUsername = '';
	let password = '';

	const submit = async (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		e.preventDefault();

		const { success, error } = await trpc($page).auth.login.mutate({
			emailOrUsername,
			password
		});

		if (!success) return alert(error); // TODO: Toast

		goto('/dashboard');
	};
</script>

<div class="grid gap-2 text-center">
	<h1 class="text-3xl font-bold">Login</h1>
	<p class="text-balance text-muted-foreground">Enter your email below to login to your account</p>
</div>
<form class="grid gap-4" on:submit={submit}>
	<div class="grid gap-2">
		<Label for="username">Email/Username</Label>
		<Input
			id="username"
			type="text"
			placeholder="m@example.com"
			required
			bind:value={emailOrUsername}
		/>
	</div>
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="password">Password</Label>
			<a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
		</div>
		<Input id="password" type="password" required bind:value={password} />
	</div>
	<Button type="submit" class="w-full">Login</Button>
	<Button variant="outline" class="w-full">Login with Google</Button>
</form>

<div class="mt-4 text-center text-sm">
	Don&apos;t have an account?
	<button on:click={() => goto('signup')} class="underline"> Signup </button>
</div>
