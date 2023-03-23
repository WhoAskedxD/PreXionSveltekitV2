<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
    import { Cards } from '$lib/components'
	export let data;
	export let form;
	$: boards = data?.boards;
	const flipDurationMs = 300;
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
	console.log(data?.boards);
</script>

<section
	use:dndzone={{ items: boards, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
	class="flex flex-row space-x-4"
>
	{#each boards as board (board.id)}
		<div class="board-column " animate:flip={{ duration: flipDurationMs }}>
			<div class="board-title">{board.title}</div>
			<div
				class="board-content flex flex-col"
				use:dndzone={{ items: board.expand.tasks, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(board.id, e)}
				on:finalize={(e) => handleDndFinalizeCards(board.id, e)}
			>
				{#each board.expand.tasks as item (item.id)}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="card" id={item.id} animate:flip={{ duration: flipDurationMs }} on:click={handleClick}>
                        <Cards cardData={item} ></Cards>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>
