<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let data;
	export let form;
	let loading;
	$: loading = false;
	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;
		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview');
			preview.src = src;
			console.log(`showing preview:`,preview)

		}
	};
	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full">
	<form
		action="?/updateProfile"
		method="POST"
		class="flex flex-col space-y-2 w-full"
		enctype="multipart/form-data"
		use:enhance={submitUpdateProfile}
	>
		<div class="form-control w-full max-w-lg flex-row justify-between">
			<label for="" class="label font-medium pb-1 order-last flex-col justify-center">
				<p class="w-full text-left">Profile Picture</p>
				<span class="">Min 200x200px. PNG or .JPEG</span>
			</label>
			<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
				<label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
					<span class="btn btn-circle btn-sm btn-secondary">
						<img src="/icons/icons8-pencil-50.png" class="w-4 h-4" alt="edit icon" />
					</span>
				</label>
				<div class="w-32 rounded-full">
					<img
						src={data.user?.avatar
							? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
							: `https://ui-avatars.com/api/?name=${data.user?.name}`}
						alt="user avatar"
						id="avatar-preview"
					/>
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				on:change={showPreview}
				disabled={loading}
			/>
		</div>
		<Input id="name" label="Name" value={data?.user?.name} disabled={loading} />
		<Input
			id="oldPassword"
			label="Old Password"
			placeholder="Old Password"
			disabled={loading}
			type="password"
		/>
		<Input
			id="password"
			label="Password"
			placeholder="Password"
			disabled={loading}
			type="password"
		/>
		<Input
			id="passwordConfirm"
			label="Confirm Password"
			placeholder="Confirm Password"
			disabled={loading}
			type="password"
		/>
		{#if form?.fail}
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
					<span>Error processing request please try again.</span>
				</div>
			</div>
		{/if}
		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>
				Update Profile
			</button>
		</div>
		
	</form>
</div>
