<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import GerenciadorTema from '$lib/comps/GerenciadorTema.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<GerenciadorTema />

{@render children()}

<style>
	:global(:root) {
		background-color: var(--cor-fundo-base);
		color: var(--cor-texto);
		scrollbar-color: var(--cor-fundo-media) var(--cor-fundo-base);
	}

	:global(body) {
		margin: 0;
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
