<script>
	export let data;
	const tableHeaders = ['name','email','department','phone','ext','region','title','notes'];
	//console.log(`data is:`, data.contacts);
</script>

<div class="contacts-page w-full flex justify-center">
	<div class="table-container w-full sm:w-fit flex flex-col items-center">
		<div class="navbar bg-base-100">
			<div class="flex-1">
				<div class="form-control">
					<input type="text" placeholder="Search" class="input input-bordered" />
				</div>
			</div>
			<div class="flex-none gap-2">
				<div class=" btn btn-primary">
					<button>Sales Maps</button>
				</div>
			</div>
		</div>
		<div class="overflow-x-auto w-full sm:w-fit">
			<table class="table table-zebra w-full">
				<!-- head -->
				<thead>
					<tr>
						{#each tableHeaders as header}
							<th>{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<!-- row 1 -->
					<tr>
						<th>1</th>
						<td>Cy Ganderton</td>
						<td>Quality Control Specialist</td>
						<td>Blue</td>
					</tr>
					<!-- row 2 -->
					<tr>
						<th>2</th>
						<td>Hart Hagerty</td>
						<td>Desktop Support Technician</td>
						<td>Purple</td>
					</tr>
					<!-- row 3 -->
					<tr>
						<th>3</th>
						<td>Brice Swyre</td>
						<td>Tax Accountant</td>
						<td>Red</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
