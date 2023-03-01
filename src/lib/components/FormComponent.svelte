<script>
	import { enhance, applyAction  } from '$app/forms';
	export let title;
	export let subtitle;
	export let formFields;
	export let color;
	const submitUpdateProfile = () => {
		return async ({ result, update }) => {
			console.log(`result is :`,result)
			switch (result.type) {
				case 'success':
					await applyAction(result);
					break;
				case 'error':
					break;
				case 'failure':
					await applyAction(result);
					break;
				default:
					await applyAction(result);
			}
		};
	};
</script>

<div class="card w-full ">
	<div
		class="card-body max-w-full {color
			? color
			: 'bg-base-100'} sm:px-12 justify-center sm:my-32  rounded-2xl"
	>
		<h2 class="card-title font-bold text-2xl justify-center">{title}</h2>
		<span class="inline pb-2 text-center">
			{subtitle}
		</span>
		<form method="POST" use:enhance>
			{#each formFields as field}
				<div class="form-control">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">{field[0].toUpperCase() + field.slice(1)}</span>
					</label>
					<!-- svelte-ignore a11y-autofocus -->
					{#if field.includes('password')}
						<input
							id={field}
							type="password"
							placeholder={field}
							class="input input-bordered"
							name={field.replace(/\s/g, '_')}
						/>
					{:else}
						<input
							id={field}
							type="text"
							placeholder={field}
							class="input input-bordered"
							name={field}
						/>
					{/if}
				</div>
			{/each}
			<div class="form-control">
				<slot name="extraField" />
				<slot name="formAction" />
				<slot name="formSubAction" />
			</div>
		</form>
	</div>
</div>
