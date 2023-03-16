<script>
	import { getImageURL } from '$lib/utils.js';
	import { page } from '$app/stores';
	const boardData = $page.data?.boards;
	const taskData = boardData.map((key) => key.expand.tasks);
	console.log('boardData', boardData);
	console.log('tasks', taskData);
</script>

<div class="home-page h-full w-full flex flex-col">
	<div class="tasks-container flex flex-row max-h-full space-x-4 overflow-scroll">
		<div class="card-container h-fit max-h-full flex flex-col bg-slate-200 rounded-lg">
			<div class="card-title-container flex flex-row justify-between mx-2 items-center ">
				<div class="card-title flex-1 h-fit">
					<input
						type="text"
						class="input input-ghost rounded-lg h-fit pl-2 pr-0 w-full"
						value="value"
					/>
				</div>
				<div class="flex-none">
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
			<div class="card-elements max-h-full overflow-y-scroll" id="card">
				<div class="card w-96 glass">
					<figure>
						<img src="/images/PreXion_Sales_Territories_December_2022.jpg" alt="car!" />
					</figure>
					<div class="card-body">
						<h2 class="card-title">Life hack</h2>
						<p>How to park your car at your garage?</p>
						<div class="card-actions justify-end">
							<button class="btn btn-primary">Learn now!</button>
						</div>
					</div>
				</div>
				<div class="card w-96 glass">
					<figure>
						<img src="/images/PreXion_Sales_Territories_December_2022.jpg" alt="car!" />
					</figure>
					<div class="card-body">
						<h2 class="card-title">Life hack</h2>
						<p>How to park your car at your garage?</p>
						<div class="card-actions justify-end">
							<button class="btn btn-primary">Learn now!</button>
						</div>
					</div>
				</div>
				<div class="card w-96 glass">
					<figure>
						<img src="/images/PreXion_Sales_Territories_December_2022.jpg" alt="car!" />
					</figure>
					<div class="card-body">
						<h2 class="card-title">Life hack</h2>
						<p>How to park your car at your garage?</p>
						<div class="card-actions justify-end">
							<button class="btn btn-primary">Learn now!</button>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer-container flex flex-row justify-between mx-2 my-2 items-center">
				<button class="pl-4">+ Add Card</button>
			</div>
		</div>
		{#each boardData as board}
			<div class="card-container h-fit max-h-full flex flex-col bg-slate-200 rounded-lg">
				<div class="card-title-container flex flex-row justify-between mx-2 items-center ">
					<div class="card-title flex-1 h-fit">
						<input
							type="text"
							class="input input-ghost rounded-lg h-fit pl-2 pr-0 w-full"
							value={board.title}
						/>
					</div>
					<div class="flex-none">
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
				<div class="card-elements max-h-full overflow-y-scroll" id="card">
					{#each board.expand.tasks as tasks}
						<div class="card w-96 glass">
							{#if tasks.files.length >= 1}
								{#each tasks.expand.files as file}
									{#if file.display}
										<figure>
											<img src={getImageURL(file.collectionId, file.id, file.file)} alt="car!" />
										</figure>
									{/if}
								{/each}
							{/if}

							<div class="card-body">
								<h2 class="card-title">{tasks.title}</h2>
								<p>How to park your car at your garage?</p>
								<div class="card-actions justify-end">
									<button class="btn btn-primary">Learn now!</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
				<div class="card-footer-container flex flex-row justify-between mx-2 my-2 items-center">
					<button class="pl-4">+ Add Card</button>
				</div>
			</div>
		{/each}
	</div>
</div>
