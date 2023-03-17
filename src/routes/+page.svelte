<script>
	export let data;
	export let form;
	import { LandingPage, HomePage  } from '$lib/components';
	
</script>

{#if data.user}
	<HomePage data={data} form={form}></HomePage>
{:else}
	<LandingPage />
{/if}
