<script>
	import { page } from '$app/stores';
	const navigation = [
		{
			title: 'Profile',
			href: '/my/settings/profile'
		},
		{
			title: 'Account',
			href: '/my/settings/account'
		},
		{
			title: 'Security',
			href: '/my/settings/security'
		}
	];
</script>

<div class="flex w-full h-full flex-row justify-center">
	<div class="w-fit flex flex-col">
		<h1 class="text-4xl font-bold">Account</h1>
		<p class="text-secondary">Adjust your account settings below.</p>
		<div class="navbar bg-base-200 rounded-2xl px-1 py-1 min-h-fit mt-2">
				<div class="navbar-center flex">
					<ul class="menu menu-horizontal px-1 space-x-4">
						{#each navigation as navItem}
							<li><a href={navItem.href} class="{$page.url.pathname === navItem.href ? 'bg-base-100 text-primary font-medium' : ''} px-8 rounded-none">{navItem.title}</a></li>
						{/each}
					</ul>
				</div>
		</div>
		<div class="w-full">
			<slot />
		</div>
	</div>
</div>
