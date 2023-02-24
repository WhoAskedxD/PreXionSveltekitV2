<script>
	let signup = false;
	let textField = ['Sign Up', 'Sign In'];
	function signUpField() {
		[textField[0], textField[1]] = [textField[1], textField[0]];
		console.log(textField);
		signup = !signup;
	}
</script>

<div class="login-screen min-h-screen grid grid-flow-col ">
	<div class="login-container w-full h-full sm:w-[40vw] flex flex-col items-center">
		<div class="navbar bg-base-100 rounded-xl px-4">
			<div class="flex-1">
				<img src="/PreXionSwish.jpg" alt="PrexionSwish logo" class="" />
				<a class="btn btn-ghost normal-case text-xl" href="/">PreXionWebApp</a>
			</div>
			<div class="flex-none">
				<!-- <button class="btn btn-square btn-ghost">
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
				</button> -->
			</div>
		</div>
        <div class="prexion-image sm:hidden sm:items-center rounded-3xl my-2 mx-2">
            <div class="px-32">
                <img src="/PreXion-logo_4c-1_1506.jpg" alt="prexion logo" class="rounded-2xl" />
            </div>
        </div>
		<div class="card w-full h-fit sm:max-w-fit ">
			<div
				class="card-body w-[512px] max-w-full bg-base-100 sm:px-12 justify-center sm:my-32  rounded-2xl"
			>
				<h2 class="card-title font-bold text-2xl justify-center">Welcome Back!</h2>
				<span class="inline pb-2 text-center"> PreXion Internal WebApp! Please Sign in below. </span>
				<div class="form-control">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">Email</span>
					</label>
					<!-- svelte-ignore a11y-autofocus -->
					<input
						id="email-field"
						type="text"
						placeholder="email"
						class="input input-bordered"
						autofocus
					/>
				</div>
				<div class="form-control">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">Password</span>
					</label>
					<input type="password" placeholder="password" class="input input-bordered" />
					{#if signup}
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text">Confirm Password</span>
						</label>
						<input type="password" placeholder="Confirm Password" class="input input-bordered" />
					{/if}
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<a href="/" class="label-text-alt link link-hover link-primary">Forgot password?</a>
					</label>
				</div>
				<div class="form-control mt-6">
					{#if signup}
						<button class="btn btn-primary">Sign up</button>
					{:else}
						<button class="btn btn-primary">Login</button>
					{/if}
					<span class="pt-6 text-center"
						>Dont have an account?
						<a href="#email-field" class="link link-hover link-primary" on:click={signUpField}
							>{textField[0]}</a
						>
					</span>
				</div>
			</div>
		</div>
	</div>
	<div class="prexion-image hidden sm:flex sm:items-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl my-2 mr-2">
		<div class="px-56">
			<img src="/PreXion-logo_4c-1_1506.jpg" alt="prexion logo" class="rounded-2xl" />
		</div>
	</div>
</div>
