<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { Cards } from '$lib/components';
	import { getImageURL, clickOutside } from '$lib/utils.js';
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	export let data;
	export let form;
	$: boardReference = null;
	$: boards = data?.boards;
	$: addTask = false;
	$: searchValue = ''
	const flipDurationMs = 300;
	function init(el) {
		el.focus();
	}
	function handleClickOutside(event) {
		addTask = false;
	}
	function handleDndConsiderColumns(e) {
		boards = e.detail.items;
	}
	function handleDndFinalizeColumns(e) {
		boards = e.detail.items;
	}
	function handleDndConsiderCards(cid, e) {
		const colIdx = boards.findIndex((c) => c.id === cid);
		boards[colIdx].expand.tasks = e.detail.items;
		boards = [...boards];
	}
	function handleDndFinalizeCards(cid, e) {
		const colIdx = boards.findIndex((c) => c.id === cid);
		boards[colIdx].expand.tasks = e.detail.items;
		boards = [...boards];
	}
	function handleClick(e) {
		alert('dragabble elements are still clickable :)');
	}
	console.log(`data.boards :`, data?.boards);
</script>

<section
	use:dndzone={{ items: boards, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
	class="flex flex-row space-x-4"
>
	{#each boards as board (board.id)}
		<div
			class="board-column h-fit max-h-full flex flex-col rounded-md bg-primary-content w-80 py-2"
			id={board.id}
			animate:flip={{ duration: flipDurationMs }}
		>
			<div class="board-title flex-1 h-fit flex flex-row justify-between">
				<form action="?/updateBoard" method="POST" enctype="multipart/form-data" use:enhance>
					<input
						type="text"
						class="input input-ghost rounded-lg h-fit pl-2 pr-0 w-full text-md font-semibold"
						bind:value={board.title}
					/>
					<input type="hidden" name="boardId" value={board.id} />
					<input type="hidden" name="title" value={board.title} />
					<button type="submit" class="hidden" />
				</form>
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

			<div class="flex-none" />
			<div
				class="board-content flex flex-col"
				use:dndzone={{ items: board.expand.tasks, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(board.id, e)}
				on:finalize={(e) => handleDndFinalizeCards(board.id, e)}
			>
				<div
					class="board-add-container flex flex-row justify-between mx-2 my-2 items-center bg-base-100 hover:drop-shadow-xl rounded dropdown"
				>
					<button
						class="pl-4 focus:ring"
						id={board.id}
						on:click={(e) => {
							addTask = !addTask;
							boardReference = e.target.id;
						}}>+ Add Task</button
					>
				</div>
				{#if addTask && boardReference == board.id}
					<form action="?/createTask" method="POST" enctype="multipart/form-data" use:enhance>
						<div
							class="card card-compact bg-base-100 drop-shadow hover:drop-shadow-xl mx-2"
							use:clickOutside
							on:click_outside={handleClickOutside}
							id={`new Card`}
						>
							<input type="hidden" name="boardId" value={board.id} />
							<input type="hidden" name="boardTasks" value={board.tasks} />
							<input type="hidden" name="userId" value={data.user.id} />
							<div class="card-body">
								<h2 class="card-title">
									<input
										name="title"
										type="text"
										class="input input-ghost rounded-lg h-fit pl-2 pr-0 w-full text-md font-semibold"
										placeholder="Enter new task here"
										value=""
										use:init
									/>
								</h2>
								{#if form?.error}
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
											<span>{form?.error.data.title.message}.</span>
										</div>
									</div>
								{/if}
								<div class="assign-users flex items-cetner space-x-2" id='userlist'>
									<div class="dropdown">
										<label for="userlist" class="my-auto focus">Assign</label>
									</div>
								</div>
							</div>
						</div>
					</form>
				{/if}
				{#each board.expand.tasks as item (item.id)}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="card"
						id={item.id}
						animate:flip={{ duration: flipDurationMs }}
						on:click={handleClick}
					>
						<Cards cardData={item} />
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>
