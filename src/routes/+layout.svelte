<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import BarraNavegacao from '$lib/comps/BarraNavegacao.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
<BarraNavegacao />

<style>
	:global(body) {
		margin: 0;
		margin-bottom: 96px; /* respira pra navbar */
		display: flex;
		flex-direction: column;

		padding-top: env(safe-area-inset-top); /* Protege o topo */
		padding-bottom: env(safe-area-inset-bottom); /* Protege a base */
	}
	:global(button:hover) {
		cursor: pointer;
	}
	:root,
	:global(button, input) {
		font-family: 'Funnel Display', sans-serif;
	}
	:global(header) {
		background-color: lightskyblue;
		border-radius: 0 0 16px 16px;
		padding: 16px;
	}
	:global(main) {
		padding-inline: 16px;
	}
</style>
