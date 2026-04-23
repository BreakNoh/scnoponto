<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import BarraNavegacao from '$lib/comps/BarraNavegacao.svelte';
	import GerenciadorTema from '$lib/comps/GerenciadorTema.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<GerenciadorTema />

{@render children()}

<BarraNavegacao />

<style>
	:global(:root) {
		/* --cor-principal: red; */
		/**/
		/* --cor-texto: black; */
		/* --cor-texto-sec: hsl(from black h s calc(l + 20)); */
		/**/
		/* --cor-fundo-base: white; */
		/* --cor-fundo-media: grey; */
		/* --cor-fundo-alta: lightgrey; */
		/**/
		background-color: var(--cor-fundo-base);
		color: var(--cor-texto);
	}

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
		background-color: var(--cor-principal);
		color: var(--cor-texto-alt);

		border-radius: 0 0 16px 16px;
		padding: 16px;
	}
	:global(main) {
		padding-inline: 16px;
	}
</style>
