<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import BarraNavegacao from '$lib/comps/BarraNavegacao.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
<div id="respiro-barra"></div>
<BarraNavegacao />

<style>
	div#respiro-barra {
		height: 6rem;
	}

	:global(body) {
		margin: 0;
		display: flex;
		flex-direction: column;

		padding-top: env(safe-area-inset-top); /* Protege o topo */
		padding-bottom: env(safe-area-inset-bottom); /* Protege o fundo */
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
		/* padding-inline: clamp(4px, 5vw, 30rem); */
		/* padding-block: 2rem; */
		border-radius: 16px;
		/* margin-bottom: 1rem; */
		padding: 16px;
		margin-inline: 16px;
		margin-top: 16px;
	}
	:global(main) {
		padding-inline: clamp(4px, 5vw, 30rem);
	}
</style>
