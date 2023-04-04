<script>
	export let data;
	export let form;
	import { LandingPage,TaskPage  } from '$lib/components';
	
</script>

{#if data.user}
	<!-- <HomePage data={data} form={form}></HomePage> -->
	<TaskPage data={data} form={form}></TaskPage>
{:else}
	<LandingPage />
{/if}
