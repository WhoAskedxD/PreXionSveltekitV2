<script>
	export let data;
	const tableHeaders = ['name', 'email', 'department', 'phone', 'ext', 'region', 'title', 'notes'];
	$: searchValue = '';
	$: salesMapToggle = false;
	let searchResults = [];
	function sortData(search) {
		searchResults = [];
		data.contacts.forEach((item) => {
			for (const key in item) {
				if (item[key].toString().toLowerCase().includes(search.toLowerCase())) {
					searchResults = [...searchResults, item];
					break;
				}
			}
		});
	}
	$: sortData(searchValue);
</script>

<div class="contacts-page flex h-full w-full">
	<div class="table-container w-full flex flex-col">
		<div class="navbar bg-base-100 justify-between w-full">
			<div class="">
				<div class="form-control">
					<input
						type="text"
						placeholder="Search"
						class="input input-bordered"
						bind:value={searchValue}
					/>
				</div>
			</div>
			<div class="flex-none gap-2">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class=" btn btn-primary" on:click={() => (salesMapToggle = !salesMapToggle)}>
					<button>Sales Maps</button>
				</div>
			</div>
		</div>
		{#if !salesMapToggle}
			<!-- content here -->
			<div class="overflow-auto mx-auto w-full 2xl:w-fit">
				<table class="table contents table-zebra">
					<!-- head -->
					<thead>
						<tr class="">
							{#each tableHeaders as header}
								<td>{header}</td>
							{/each}
						</tr>
					</thead>
					<tbody>
						<!-- row 1 -->
						{#each searchResults as contact}
							<tr class="hover">
								{#each tableHeaders as header}
									<td class={header == 'notes' ? '' : ''}>{contact[header]}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div class="image-container w-full h-full">
				<img class='mx-auto' src="/images/PreXion_Sales_Territories_December_2022.jpg" alt="sales map" />
			</div>
		{/if}
	</div>
</div>
