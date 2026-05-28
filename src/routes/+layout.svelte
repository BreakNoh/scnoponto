<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import GerenciadorTema from '$lib/comps/GerenciadorTema.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<GerenciadorTema />

<header><h1>SCnoPONTO</h1></header>
{@render children()}

<style>
	header {
		min-height: min(5rem, 64px);
		height: 10vh;
		background-color: green;

		display: grid;
		align-content: center;

		padding-inline: 16px;

		box-shadow: 0 8px darkgreen;

		@media (min-width: 700px) {
			height: 12vh;
			padding-inline: 5%;
		}
	}

	header h1 {
		margin: 0;
		font-size: max(1.5rem, 2vw);
	}
	:global(:root) {
		background-color: var(--cor-fundo-base);
		color: var(--cor-texto);
		scrollbar-color: var(--cor-fundo-media) var(--cor-fundo-base);
	}

	:global(body) {
		margin: 0;
		/* margin-bottom: 16px; */
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
	/* :global(header) { */
	/* 	background-color: var(--cor-principal); */
	/* 	color: var(--cor-texto-alt); */
	/**/
	/* 	border-radius: 0 0 16px 16px; */
	/* 	padding: 16px; */
	/* } */
	/* :global(main) { */
	/* 	padding-inline: 16px; */
	/* } */
</style>
