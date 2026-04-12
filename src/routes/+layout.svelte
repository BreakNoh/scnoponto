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
	:global(header) {
		background-color: lightskyblue;
		padding-inline: clamp(4px, 5vw, 30rem);
		padding-block: 2rem;
		border-radius: 0 0 16px 16px;
		margin-bottom: 1rem;
	}
	:global(main) {
		padding-inline: clamp(4px, 5vw, 30rem);
	}
</style>
