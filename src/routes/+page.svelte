<script>
	export let data;
	import { LandingPage,  } from '$lib/components';
	
</script>

{#if data.user}
	<div class="bg-gradient-to-r from-cyan-500 to-blue-500">logged in</div>
{:else}
	<LandingPage />
{/if}
