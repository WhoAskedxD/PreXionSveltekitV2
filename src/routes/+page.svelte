<script>
	export let data;
	import { LandingPage, HomePage  } from '$lib/components';
	
</script>

{#if data.user}
	<HomePage ></HomePage>
{:else}
	<LandingPage />
{/if}
