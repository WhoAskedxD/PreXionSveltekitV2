<script>
	import { getImageURL, clickOutside } from '$lib/utils.js';
	import { invalidateAll } from '$app/navigation';
	import { enhance, applyAction } from '$app/forms';
	export let data;
	export let form;
	let addTask = false;
	let boardData = data?.boards;
	const sample = boardData[0].expand.tasks;
	console.log(data);
	let boardReference;
	function init(el) {
		el.focus();
	}
	function handleClickOutside(event) {
		addTask = false;
	}
	$:if (form?.success){
		console.log(`reading form data sucessfully : `,form.sampleData);
		const editIndex = boardData.findIndex((board) => {
			return board.id == form.sampleData.id
		})
		addTask = false;
		boardData[editIndex].expand.tasks = [...boardData[editIndex].expand.tasks,form.sampleData]
	}
</script>

<div class="home-page h-full w-full flex flex-col">
	<div class="tasks-container flex flex-row h-full space-x-4 overflow-scroll ml-2">
		<!-- <div class="card-container h-fit max-h-full flex flex-col bg-slate-200 rounded-lg">
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
			<div class="card-elements max-h-full overflow-y-auto overflow-x-hidden scrollbar-hide" id="card">
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
		</div> -->
		{#each boardData as board, boardIndex}
			<div
				class="board-container h-fit max-h-full flex flex-col rounded-md bg-primary-content w-80 py-2" 
				id={`board_${boardIndex}`}
			>
				<div class="board-title-container flex flex-row justify-between mx-2 items-center">
					<div class="board-title flex-1 h-fit">
						<input
							type="text"
							class="input input-ghost rounded-lg h-fit pl-2 pr-0 w-full text-md font-semibold"
							value={board.title}
						/>
					</div>
					<div class="flex-none">
						<button class="btn btn-sm btn-ghost">
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
				<div class="board-add-container flex flex-row justify-between mx-2 my-2 items-center bg-base-100 hover:drop-shadow-xl rounded dropdown">
					<button
						class="pl-4 "
						id={board.id}
						on:click={(e) => {
							addTask = !addTask;
							boardReference = e.target.id;
						}}>+ Add Task</button
					>
				</div>
				<div
					class="board-elements max-h-full space-y-2 overflow-y-auto overflow-x-hidden px-2"
					id="card"
				>
					{#if addTask && boardReference == board.id}
						<form
							action="?/createTask"
							method="POST"
							enctype="multipart/form-data"
							use:enhance
						>
							<div
								class="card card-compact cursor-pointer bg-base-100 drop-shadow hover:drop-shadow-xl"
								use:clickOutside
								on:click_outside={handleClickOutside}
								id={`new Card`}
							>
								<div class="card-body">
									<h2 class="card-title">
										<input type="hidden" name="id" value={board.id} />
										<input
											name="title"
											type="text"
											class="input input-ghost rounded-lg h-fit pl-2 pr-0 w-full text-md font-semibold"
											placeholder="Enter new task here"
											value=""
											use:init
										/>
									</h2>
									<p>test</p>
								</div>
							</div>
						</form>
					{/if}
					{#each board.expand?.tasks as task}
						<div
							class="card card-compact cursor-pointer bg-base-100 drop-shadow hover:drop-shadow-xl"
							taskid={task.id}
							boardId={board.id}
						>
							{#if task.image}
								<figure>
									<img
										src={getImageURL(task.collectionId, task.id, task.image)}
										alt="task pic!"
										id={task.id}
									/>
								</figure>
							{/if}
							<div class="card-body" taskid={task.id} boardId={board.id}>
								<h2 class="card-title" taskid={task.id} boardId={board.id}>{task.title}</h2>
								<p>{task.notes}</p>
								<!-- <div class="task-actions justify-end">
									<button class="btn btn-primary">Learn now!</button>
								</div> -->
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
