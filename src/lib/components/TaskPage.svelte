<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { Cards,Modal } from '$lib/components';
	import { clickOutside } from '$lib/utils.js';
	import { enhance } from '$app/forms';
	export let data;
	export let form;
	$: boardReference = null;
	$: boards = data?.boards;
	$: addTask = false;
	const newBoardData = {
		title: 'New Board',
		user: data.user.id
	};
	const deleteBoardData = {
		RECORD_ID:null,
		title:null,
	}
	$: searchValue = '';
	let users = data?.users.map((element) => element);
	$: filteredUsers = users.filter((user) =>
		user.name.toLowerCase().includes(searchValue.toLowerCase())
	);
	$: assignedUsers = [];
	const flipDurationMs = 300;
	const boardOrderRecord = data.boardInfo[0];
	let dragDisabled = false;
	function init(el) {
		el.focus();
	}
	function handleClickOutside(event) {
		addTask = false;
		dragDisabled = false;
	}
	function handleDndConsiderColumns(e) {
		boards = e.detail.items;
	}
	async function handleDndFinalizeColumns(e) {
		boards = e.detail.items;
		console.log(`new column items :`, e.detail.items);
		const newColumnOrder = e.detail.items.map((element) => element.id);
		const response = await fetch('/api/boardOrder', {
			method: 'POST',
			body: JSON.stringify({ recordID: boardOrderRecord.id, boardorder: newColumnOrder })
		});
	}
	function handleDndConsiderCards(cid, e) {
		const colIdx = boards.findIndex((c) => c.id === cid);
		boards[colIdx].expand.tasks = e.detail.items;
		boards = [...boards];
	}
	async function handleDndFinalizeCards(cid, e) {
		const colIdx = boards.findIndex((c) => c.id === cid);
		boards[colIdx].expand.tasks = e.detail.items;
		boards = [...boards];
		const newTasksOrder = e.detail.items.map((element) => element.id);
		const response = await fetch('/api/task', {
			method: 'POST',
			body: JSON.stringify({ boardId: cid, tasksOrder: newTasksOrder })
		});
	}
	function addUser(user) {
		assignedUsers.push(user);
		users.splice(users.indexOf(user), 1);
		assignedUsers = assignedUsers;
		users = users;
	}
	function removeUser(user) {
		users.push(user);
		assignedUsers.splice(assignedUsers.indexOf(user), 1);
		assignedUsers = assignedUsers;
		users = users;
	}
	function focusAddTask(event) {
		if (event.key == 'Escape') {
			document.getElementById('submit-new-task').focus();
		}
	}
	function deleteBoard(RECORD_ID,title) {
		deleteBoardData.RECORD_ID= RECORD_ID;
		deleteBoardData.title= title;
	}

	$: console.log(`data :`, data);
	$: console.log(`form :`, form);
	$: if (form?.success) {
		handleClickOutside();
	}
	// $: console.log(`drag disabeld ?`,dragDisabled);
</script>

<div class=" flex flex-row space-x-4">
	<input type="checkbox" id="my-modal-4" class="modal-toggle" />
	<label for="my-modal-4" class="modal cursor-pointer">
		<label class="modal-box relative" for="">
			<h3 class="text-lg font-bold text-center">Are you sure you wana delete {deleteBoardData.title}!</h3>
			<div class="modal-action justify-between">
				<label for="my-modal-4" class="btn">Close!</label>
				<form
					action="?/deleteBoard"
					method="POST"
					enctype="multipart/form-data"
					use:enhance
				>
				<input type="hidden" name="RECORD_ID" value={deleteBoardData.RECORD_ID} />
				<button><label for="my-modal-4" class="btn">Delete!</label></button>
				</form>
			</div>
		</label>
	</label>
	<section
		use:dndzone={{ items: boards, flipDurationMs, type: 'columns', dragDisabled }}
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
				<div class="board-title h-fit flex flex-row justify-between">
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
					<div class="dropdown dropdown-end">
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<label for="deleteboard" tabindex="0" class="m-1 cursor-pointer">
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
						</label>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<ul
							for="deleteboard"
							tabindex="0"
							class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<label for="my-modal-4" class="" on:click={()=> deleteBoard(board.id,board.title)}>Delete Board</label>						
							</li>
						</ul>
					</div>
				</div>
				<div
					class="board-add-container  mx-2 my-2 items-center bg-base-100 hover:drop-shadow-xl rounded"
				>
					<button
						class="pl-4 focus:ring"
						id={board.id}
						on:click={(e) => {
							addTask = !addTask;
							dragDisabled = !dragDisabled;
							boardReference = e.target.id;
						}}>+ Add Task</button
					>
				</div>
				<div
					class="board-content flex flex-col space-y-2 min-h-[16px]"
					use:dndzone={{ items: board.expand.tasks, flipDurationMs, dragDisabled }}
					on:consider={(e) => handleDndConsiderCards(board.id, e)}
					on:finalize={(e) => handleDndFinalizeCards(board.id, e)}
				>
					{#if addTask && boardReference == board.id}
						<form
							action="?/createTask"
							method="POST"
							enctype="multipart/form-data"
							class="z-10"
							use:enhance
						>
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
									<div class="assign-users flex items-center space-x-2 " id="userlist">
										<div class="dropdown">
											<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
											<label tabindex="0" for="" class="my-auto" on:keydown={focusAddTask}
												>Assign</label
											>
											<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
											<ul
												tabindex="0"
												class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60 mt-4"
											>
												<input
													id="assign-user-input"
													name="searched_user"
													type="text"
													class="input h-fit pl-2 pr-0 w-full text-sm "
													placeholder="Type a name or email address"
													bind:value={searchValue}
													on:keydown={focusAddTask}
												/>
												{#if assignedUsers.length >= 1}
													<div class="mt-4">Assigned</div>
													{#each assignedUsers as user}
														<li>
															<label
																tabindex="0"
																for=""
																class="justify-between"
																on:click={() => removeUser(user)}
																on:keypress={() => removeUser(user)}
																on:keydown={focusAddTask}
															>
																<span>{user.name}</span>
																<span> X </span>
															</label>
														</li>
													{/each}
												{/if}
												<div class="mt-4">Users</div>
												{#each filteredUsers as user}
													<li>
														<label
															tabindex="0"
															for=""
															on:click={() => addUser(user)}
															on:keypress={() => addUser(user)}
															on:keydown={focusAddTask}
														>
															{user.name}</label
														>
													</li>
												{/each}
											</ul>
										</div>
										{#each assignedUsers as users}
											<div class="avatar">
												<div class="w-8 rounded-xl">
													<img
														src={`https://ui-avatars.com/api/?name=${users.name}`}
														alt="Tailwind-CSS-Avatar-component"
													/>
												</div>
											</div>
										{/each}
									</div>
									<button id="submit-new-task" class="btn btn-primary">Add Task</button>
								</div>
							</div>
						</form>
					{/if}
					{#each board.expand.tasks as item (item.id)}
						<div class="card" id={item.id} animate:flip={{ duration: flipDurationMs }}>
							<Cards cardData={item} />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>
	<div class="new-Board-column w-64 py-2 flex-none">
		<div class="board-title bg-base-200 rounded-lg">
			<form action="?/createBoard" method="POST" enctype="multipart/form-data" use:enhance>
				<input
					type="text"
					class="input input-ghost rounded-lg h-fit pl-2 pr-0 w-full text-md font-semibold"
					bind:value={newBoardData.title}
				/>
				<input type="hidden" name="user" value={newBoardData.user} />
				<input type="hidden" name="assigned" value={newBoardData.user} />
				<input type="hidden" name="title" value={newBoardData.title} />
				<input type="hidden" name="boardOrder" value={boardOrderRecord.boards} />
				<input type="hidden" name="boardOrderId" value={boardOrderRecord.id} />
				<button type="submit" class="hidden" />
			</form>
		</div>
	</div>
</div>
