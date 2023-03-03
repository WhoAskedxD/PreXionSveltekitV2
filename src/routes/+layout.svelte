<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import {getImageURL} from '$lib/utils'
	$: drawerToggle = true;
	export let data;
</script>

{#if data.user}
	<div class="drawer drawer-mobile">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col items-center justify-center">
			<!-- NavBar content here -->
			<div class="navbar bg-base-100">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<label for="my-drawer-2" class="btn btn-square btn-ghost" on:click={() => (drawerToggle =!drawerToggle)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-5 h-5 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</label>
				<div class="flex-1">
					<a href="/" class="btn btn-ghost normal-case text-xl">PreXion</a>
				</div>
				<div class="flex-none gap-2">
					<div class="px-1">{data.user.name}</div>
					<div class="dropdown dropdown-end">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<label tabindex="0" class="btn btn-ghost btn-circle avatar">
							<div class="w-10 rounded-full">
								<img src={data.user?.avatar
									? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
									: `https://ui-avatars.com/api/?name=${data.user?.name}`}
									alt="User Avatar" />
							</div>
						</label>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<ul
							tabindex="0"
							class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
						>
							<li><a href="/my/settings" class="justify-between">Profile</a></li>
							<li><a href="/my/settings">Settings</a></li>
							<li>
								<form action="/logout" method="POST">
									<button type="submit" class="w-full text-start">Logout</button>
								</form>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="divider my-0"></div>
			<!-- Page content here -->
			<slot />
		</div>
		<div class="drawer-side">
			<label for="my-drawer-2" class="drawer-overlay" />
			<ul class="menu p-4 w-48 lg:w-24 bg-neutral text-neutral-content {drawerToggle ? 'sm:hidden':''}">
				<!-- Sidebar content here -->
				<li class="w-full">
					<a class=" my-2 px-0 py-0" href="/">
						<img class="rounded-lg " src="/PreXion-logo_4c-1_1506.jpg" alt="Prexion Logo" />
					</a>
				</li>
				<li class="w-full">
					<a class=" my-2 px-0 py-0" href="/"
						><img
							class="rounded-lg {$page.url.pathname === '/protected/contacts'
								? 'bg-neutral-content'
								: ''}"
							src="/icons/icons8-contacts-96.png"
							alt="Prexion Logo"
						/>
					</a>
				</li>
			</ul>
		</div>
	</div>
{:else}
	<slot />
{/if}
