<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(body) {
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	:global(button:hover) {
		cursor: pointer;
	}
	:root {
		font-family: 'Funnel Display', sans-serif;
	}
</style>
