<script>
	import { FormComponent } from '$lib/components';
	import { page } from '$app/stores';
	$: signup = false || $page.form?.error;
	// $: console.log($page.form?.error)
</script>

<div class="login-screen min-h-screen max-h-screen grid grid-flow-col ">
	<div class="login-container w-full h-full lg:w-[40vw] flex flex-col items-center">
		<div class="navbar bg-base-100 rounded-xl px-4">
			<div class="flex-1">
				<img src="/PreXionSwish.jpg" alt="PrexionSwish logo" class="" />
				<a class="btn btn-ghost normal-case text-xl" href="/"
					>PreXionWebApp </a
				>
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
		<div class="form-card">
			{#if signup}
				<FormComponent
					title="Welcome Back!"
					subtitle="PreXion Internal WebApp! Please Sign Up below."
					formFields={['name', 'email', 'password', 'confirm password']}
				>
					<button slot="formAction" class="btn btn-primary mt-4" formaction="?/register" 
						>Sign up</button
					>
					<span slot="formSubAction" class="pt-6 text-center"
						>Already have an Account?
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="" class="link link-hover link-primary" on:click={() => (signup = false)}>Sign In</a
						>
					</span>
					<div slot="extraField" class="py-2 flex flex-col">
						{#if $page.form?.error}
							<div class="alert alert-error shadow-lg w-full max-w-md">
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="stroke-current flex-shrink-0 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/></svg
									>
									<span>{$page.form?.error}.</span>
								</div>
							</div>
						{/if}
					</div>
				</FormComponent>
			{:else}
				<FormComponent
					title="Welcome Back!"
					subtitle="PreXion Internal WebApp! Please Sign In below."
					formFields={['email', 'password']}
				>
					<div slot="extraField" class="py-2 flex flex-col">
						<span class="text-center">
							{#if $page.form?.registered}
								<div class="alert alert-success shadow-lg">
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="stroke-current flex-shrink-0 h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/></svg
										>
										<span>Successfully registered Please check your email!</span>
									</div>
								</div>
							{/if}
							<label for="my-modal-4" class="link link-hover link-primary">Forgot Password?</label>
							<input type="checkbox" id="my-modal-4" class="modal-toggle" />
							<label for="my-modal-4" class="modal cursor-pointer">
								<label class="modal-box relative" for="">
									<h3 class="text-lg font-bold">Please enter your email address here.</h3>
									<form
										action="?/resetPassword"
										method="POST"
										class="flex flex-col items-center space-y-2 w-full pt-4"
									>
										<div class="form-control w-full max-w-md">
											<label for="email" class="label font-medium pb-1">
												<span class="label-text">Email</span>
											</label>
											<input
												type="email"
												name="email"
												class="input input-bordered w-full max-w-md"
											/>
										</div>
										<div class="w-full max-w-md pt-2">
											<button type="submit" class="btn btn-primary w-full"
												>Request Password Reset</button
											>
										</div>
									</form>
								</label>
							</label>
						</span>
						{#if $page.form?.notVerified}
							<div class="alert alert-error shadow-lg w-full max-w-md">
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="stroke-current flex-shrink-0 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/></svg
									>
									<span>You must verify your email before you can login.</span>
								</div>
							</div>
						{/if}
						{#if $page.form?.success}
							<div class="alert alert-success shadow-lg w-full max-w-md">
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="stroke-current flex-shrink-0 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/></svg
									>
									<span>An email has been sent to reset your password!</span>
								</div>
							</div>
						{/if}
					</div>
					<button slot="formAction" class="btn btn-primary" formaction="?/login">Log In</button>
					<span slot="formSubAction" class="pt-6 text-center"
						>Don't have an Account?
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="" class="link link-hover link-primary" on:click={() => (signup = true)}>Sign Up</a
						>
					</span>
				</FormComponent>
			{/if}
		</div>
	</div>
	<div
		class="prexion-image hidden lg:flex lg:items-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl my-2 mr-2"
	>
		<div class="px-56">
			<img src="/PreXion-logo_4c-1_1506.jpg" alt="prexion logo" class="rounded-2xl" />
		</div>
	</div>
</div>
