<script lang="ts">
	import NavegacaoDias from '$lib/comps/NavegacaoDias.svelte';
	import TabelaHorarios from '$lib/comps/TabelaHorarios.svelte';
	import { ChevronLeft, Heart } from '@lucide/svelte';

	let { data } = $props();
	let linha = $derived(data.linha);
	let dia = $derived(data.dia);
	let servicos = $derived(linha.servicos.get(dia) || []);

	let favorito = $state(false);
	const alternar_favorito = () => (favorito = !favorito);
</script>

<header>
	<nav>
		<a href="/"><ChevronLeft />voltar</a>
		<button onclick={alternar_favorito}><Heart fill={favorito ? 'black' : 'transparent'} /></button>
	</nav>
	<h1>nome da empresa</h1>
	<h2 style={`font-size: ${linha.nome.length < 20 ? '2rem' : '1.5rem'}`}>
		{linha.nome}
	</h2>
	{#if linha.codigo}
		<span>
			<abbr title={`${linha.codigo} | ${linha.nome}`}>{linha.codigo}</abbr>
		</span>
	{/if}
</header>
<NavegacaoDias {linha} {dia} />
<main>
	{#each servicos as servico}
		<TabelaHorarios {servico} />
	{/each}
</main>

<style>
	main {
		margin-top: 1rem;
		padding-inline: clamp(4px, 5vw, 30rem);

		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media (min-width: 650px) {
			flex-direction: row;
		}
	}
	nav {
		display: flex;
		margin-bottom: 0.5rem;
		justify-content: space-between;
	}
	nav a {
		color: black;
		text-decoration: none;
		display: flex;
	}
	nav button {
		background-color: transparent;
		border: none;
		padding: 0;
	}
	h1 {
		margin: 0;
		font-size: 1rem;
	}
	h2 {
		margin-block: 0;
		max-height: 3.5rem;
		overflow-y: auto;
	}
</style>
