<script>
	export let title;
	export let subtitle;
	export let formFields;
    export let color;
    export let data;
</script>

<div class="card w-full sm:max-w-fit ">
	<div
		class="card-body w-[512px] max-w-full {color? color : 'bg-base-100'} sm:px-12 justify-center sm:my-32  rounded-2xl"
	>
		<h2 class="card-title font-bold text-2xl justify-center">{title}</h2>
		<span class="inline pb-2 text-center">
			{subtitle}
		</span>
		<form method="POST">
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
							name={field.replace(/\s/g,'_')}
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
			<div class="form-control pt-4">
                <slot name='extraField' />
				<slot name="formAction" />
                <slot name='formSubAction' />
			</div>
		</form>

	</div>
</div>
