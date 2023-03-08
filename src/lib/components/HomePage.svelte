<script>
	// your script goes here
	import { page } from '$app/stores';
	// console.log($page.data)
</script>

<div class="home-page h-full w-full flex flex-col">
	<div class="navbar">
		<div class="form-control">
			<input type="text" placeholder="Search" class="input input-bordered" />
		</div>
	</div>
	<div class="divider my-0" />
	<div class="tasks-container flex flex-row flex-1 h-[calc(90%)] space-x-4">
		<div class="card-container overflow-auto">
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
		<div class="card-container overflow-auto">
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
	</div>
</div>
