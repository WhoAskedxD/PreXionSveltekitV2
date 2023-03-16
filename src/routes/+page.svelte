<script>
	export let data;
	import { LandingPage, HomePage  } from '$lib/components';
	
</script>

{#if data.user}
	<HomePage data={data}></HomePage>
{:else}
	<LandingPage />
{/if}
