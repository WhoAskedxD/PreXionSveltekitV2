<script>
	import '../app.postcss';
	export let data;
</script>

{#if data.user}
	<div class="drawer drawer-mobile">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col items-center justify-center">
			<!-- NavBar content here -->
			<div class="navbar bg-base-100">
				<label for="my-drawer-2" class="btn btn-square btn-ghost lg:hidden">
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
				<div class="flex-none">
					<div>{data.user.name}</div>
					<button class="btn btn-square btn-ghost">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block w-5 h-5 stroke-current"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
							/></svg
						>
					</button>
				</div>
			</div>
			<!-- Page content here -->
			<slot />
		</div>
		<div class="drawer-side">
			<label for="my-drawer-2" class="drawer-overlay" />
			<ul class="menu p-4 w-64 bg-base-100 text-base-content">
				<!-- Sidebar content here -->
				<li><a>Sidebar Item 1</a></li>
				<li><a>Sidebar Item 2</a></li>
			</ul>
		</div>
	</div>
{:else}
	<slot />
{/if}
