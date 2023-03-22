<script>
	import { getImageURL, clickOutside } from '$lib/utils.js';
	import { enhance, applyAction } from '$app/forms';
	export let data;
	export let form;
	let addTask = false;
	let assignee = [];
	let searchResults = [];
	$: searchValue = '';
	let boardData = data?.boards;
	let otherUsers = data?.users.map((element) => element.name);
	let boardReference;
	function init(el) {
		el.focus();
	}
	function focusAddTask(event) {
		if (event.key == 'Escape') {
			document.getElementById('submit-new-task').focus();
		}
	}
	function handleClickOutside(event) {
		addTask = false;
	}
	function addAssignee(user) {
		assignee.push(user);
		searchResults.splice(searchResults.indexOf(user), 1);
		searchResults = searchResults;
		assignee = assignee;
	}
	function removeAssignee(user) {
		searchResults.push(user);
		assignee.splice(assignee.indexOf(user), 1);
		assignee = assignee;
		searchResults = searchResults;
	}
	function searchUser(searchValue) {
		searchResults = [];
		otherUsers.map((name) => {
			if (name.toLowerCase().includes(searchValue.toLowerCase())) {
				searchResults.push(name);
			}
		});
		if (assignee.length >= 1) {
			assignee.map((user) => {
				searchResults.splice(searchResults.indexOf(user), 1);
			});
		}
	}
	$: if (form?.success) {
		console.log(`reading form data sucessfully : `, form.taskData);
		const editIndex = boardData.findIndex((board) => {
			return board.id == form.taskData.boardId;
		});
		addTask = false;
		boardData[editIndex].expand.tasks = [
			form.taskData.newTask,
			...boardData[editIndex].expand.tasks
		];
	}
	console.log(data);
	$: searchUser(searchValue);
</script>

<div class="home-page h-full flex flex-col">
	<div class="tasks-container flex flex-row h-full space-x-4 w-fit sm:flex-inital ml-2">
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
				<div
					class="board-add-container flex flex-row justify-between mx-2 my-2 items-center bg-base-100 hover:drop-shadow-xl rounded dropdown"
				>
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
						<form action="?/createTask" method="POST" enctype="multipart/form-data" use:enhance>
							<div
								class="card card-compact bg-base-100 drop-shadow hover:drop-shadow-xl z-10"
								use:clickOutside
								on:click_outside={handleClickOutside}
								id={`new Card`}
							>
								<div class="card-body">
									<h2 class="card-title">
										<input type="hidden" name="boardId" value={board.id} />
										<input type="hidden" name="boardTasks" value={board.tasks} />
										<input type="hidden" name="userId" value={data.user.id} />
										<input type="hidden" name="assigned" value={assignee} />
										<input
											name="title"
											type="text"
											class="input input-ghost rounded-lg h-fit pl-2 pr-0 w-full text-md font-semibold"
											placeholder="Enter new task here"
											value=""
											use:init
										/>
									</h2>
									<div class="assign-user flex items-center space-x-2">
										<div class="dropdown">
											<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
											<!-- svelte-ignore a11y-label-has-associated-control -->
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<label
												tabindex="0"
												class="my-auto"
												on:click={() => {
													document.getElementById('assign-user-input').focus();
												}}
												on:focus|once={() => {
													document.getElementById('assign-user-input').focus();
												}}
												on:keydown={focusAddTask}
												>Assign</label
											>
											<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
											<ul
												tabindex="0"
												class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60 mt-4"
											>
												<input
													id="assign-user-input"
													name="assign"
													type="text"
													class="input h-fit pl-2 pr-0 w-full text-sm "
													placeholder="Type a name or email address"
													bind:value={searchValue}
													on:keydown={focusAddTask}
												/>
												{#if assignee.length >= 1}
													<div class="mt-4">Assigned Users</div>
													{#each assignee as assignedUser}
														<li>
															<label class="justify-between" for="assign-user-input">
																{assignedUser}
																<div
																	tabindex="0"
																	on:click={() => removeAssignee(assignedUser)}
																	on:keypress={() => removeAssignee(assignedUser)}
																	on:keydown={focusAddTask}
																>
																	X
																</div>
															</label>
														</li>
													{/each}
												{/if}
												<div class="mt-4">Users</div>
												{#each searchResults as users}
													<li>
														<label
															tabindex="0"
															for=""
															on:click={() => addAssignee(users)}
															on:keypress={() => addAssignee(users)}
															on:keydown={focusAddTask}
															>{users}
														</label>
													</li>
												{/each}
											</ul>
										</div>
										<div class="assigned-users space-x-1">
											{#each assignee as assignedUser}
												<div class="avatar">
													<div class="w-8 rounded-xl">
														<img
															src={`https://ui-avatars.com/api/?name=${assignedUser}`}
															alt="Tailwind-CSS-Avatar-component"
														/>
													</div>
												</div>
											{/each}
										</div>
									</div>
									<div class="card-actions justify-center">
										<button class="btn btn-primary" id="submit-new-task">Add Task!</button>
									</div>
								</div>
							</div>
						</form>
					{/if}
					{#each board.expand?.tasks as task}
						<div
							class="card card-compact bg-base-100 drop-shadow hover:drop-shadow-xl"
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
								{#if task.assigned?.length >= 2}
									<div class="divider my-0" />
									<span class="flex flex-row justify-end space-x-1">
										{#each task.expand?.assigned as user}
											{#if user.id != data.user.id}
												<div class="avatar">
													<div class="w-8 rounded-xl">
														<img
															src={`https://ui-avatars.com/api/?name=${user.name}`}
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
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
