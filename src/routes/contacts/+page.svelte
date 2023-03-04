<script>
	export let data;
	const tableHeaders = ['name', 'email', 'department', 'phone', 'ext', 'region', 'title', 'notes'];
	$: searchValue = '';
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

<div class="contacts-page flex justify-center h-full w-fit 2xl:w-full">
	<div class="table-container w-fit flex flex-col">
		<div class="navbar bg-base-100 sticky w-screen sm:w-full">
			<div class="flex-1">
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
				<div class=" btn btn-primary">
					<button>Sales Maps</button>
				</div>
			</div>
		</div>
		<div class="w-full sm:w-fit overflow-auto">
			<table class="table table-zebra">
				<!-- head -->
				<thead>
					<tr>
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
	</div>
</div>
