<script>
	import { Input } from '$lib/components';
</script>

<div class="home-page h-full w-full flex flex-col">
	<div class="tasks-container flex flex-row max-h-full space-x-4 overflow-scroll">
		<div class="card-container max-h-full flex flex-col space-y-4 ">
			<div class="card-title-container flex flex-row justify-between mx-2 items-center">
				<div class="card-title flex-1 h-fit">
					<input type="text" class="input rounded-sm h-fit pl-2 pr-0 w-full" value="value" />
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
			<div class="card-elements max-h-full overflow-scroll">
				<div class="card w-96 glass my-2">
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
				<div class="card w-96 glass my-2">
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
				<div class="card w-96 glass my-2">
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
			<div class="card-footer-container w-full flex flex-row justify-between mx-2 items-center">
				<button class="">+ Add Card</button>
			</div>
		</div>
		<div class="card-container max-h-full flex flex-col space-y-4">
			<div class="card-title-container flex flex-row justify-between mx-2 items-center">
				<div class="card-title flex-1 h-fit">
					<input type="text" class="input rounded-sm h-fit pl-2 pr-0 w-full" value="value" />
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
			<div class="card-elements max-h-full overflow-scroll space-y-2">
				<div class="card w-96 glass bg-black">
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
			<div class="card-footer-container w-full flex flex-row justify-between mx-2 items-center">
				<button class="">+ Add Card</button>
			</div>
		</div>

		<div class="card-container h-full flex flex-col">
			<Input name="Task" label="" value="To Do" />
			<div class="card-elements h-[calc(80%)] flex-1 overflow-auto">
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
</div>
