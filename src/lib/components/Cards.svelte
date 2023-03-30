<script>
	import { page } from '$app/stores';
	import { getImageURL, clickOutside } from '$lib/utils.js';
	const user = $page.data?.user
	export let cardData;
	//console.log(`cardData :`, cardData);
</script>

<div class="card card-compact bg-base-100 drop-shadow hover:drop-shadow-xl" taskid={cardData.id}>
	{#if cardData.image}
		<figure>
			<img src={getImageURL(cardData.collectionId, cardData.id, cardData.image)} alt="task pic!" id={cardData.id} />
		</figure>
	{/if}
	<div class="card-body" taskid={cardData.id} boardId={cardData.id}>
		<h2 class="card-title" taskid={cardData.id} boardId={cardData.id}>{cardData.title}</h2>
		{#if cardData.assigned?.length > 1}
			<div class="divider my-0" />
			<span class="flex flex-row justify-end space-x-1">
				{#each cardData.expand?.assigned as assignedUser}
					{#if assignedUser.id != user.id}
						<div class="avatar">
							<div class="w-8 rounded-xl">
								<img
									src={`https://ui-avatars.com/api/?name=${assignedUser.name}`}
									alt="Tailwind-CSS-Avatar-component"
								/>
							</div>
						</div>
					{/if}
				{/each}
			</span>
		{/if}
		<!-- <div class="task-actions justify-end">
			<button class="btn btn-primary">Learn now!</button>
		</div> -->
	</div>
</div>
