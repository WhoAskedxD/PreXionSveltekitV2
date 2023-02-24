<script>
	import { FormComponent } from '$lib/components';
	import { page } from '$app/stores';
	let signup = false;
	let textField = ['Sign Up', 'Sign In'];
	function signUpField() {
		[textField[0], textField[1]] = [textField[1], textField[0]];
		signup = !signup;
	}
</script>

<div class="login-screen min-h-screen max-h-screen grid grid-flow-col ">
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
		<div class="form-card">
			{#if signup}
				<FormComponent
					title="Welcome Back!"
					subtitle="PreXion Internal WebApp! Please Sign Up below."
					formFields={['name', 'email', 'password', 'confirm password']}
				>
					<button slot="formAction" class="btn btn-primary" formaction="?/register">Sign up</button>
					<span slot="formSubAction" class="pt-6 text-center"
						>Already have an Account?
						<a href="#email-field" class="link link-hover link-primary" on:click={signUpField}
							>{textField[0]}</a
						>
					</span>
				</FormComponent>
			{:else}
				<FormComponent
					title="Welcome Back!"
					subtitle="PreXion Internal WebApp! Please Sign In below."
					formFields={['email', 'password']}
				>
					<div slot="extraField" class="py-2">
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
					</div>
					<button slot="formAction" class="btn btn-primary" formaction="?/login">Sign In</button>
					<span slot="formSubAction" class="pt-6 text-center"
						>Don't have an Account?
						<a href="#email-field" class="link link-hover link-primary" on:click={signUpField}
							>{textField[0]}</a
						>
					</span>
				</FormComponent>
			{/if}
		</div>
	</div>
	<div
		class="prexion-image hidden sm:flex sm:items-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl my-2 mr-2"
	>
		<div class="px-56">
			<img src="/PreXion-logo_4c-1_1506.jpg" alt="prexion logo" class="rounded-2xl" />
		</div>
	</div>
</div>
