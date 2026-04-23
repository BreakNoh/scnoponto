<script lang="ts">
	import Colapsavel from '$lib/comps/Colapsavel.svelte';
	import NavegacaoDias from '$lib/comps/NavegacaoDias.svelte';
	import TabelaHorarios from '$lib/comps/TabelaHorarios.svelte';
	import { ChevronLeft, Heart } from '@lucide/svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type CacheLinha from '$lib/cache';

	let { data } = $props();

	let linha = $derived(data.linha);
	let dia = $derived(data.dia);
	let servicos = $derived(linha.servicos.get(dia) || []);
	let favorito = $derived(linha.favorita);
	let cache: null | CacheLinha = $state(null);

	onMount(async () => {
		if (browser) {
			cache = new (await import('$lib/cache')).default();
		}
	});

	const alternar_favorito = async () => {
		if (!cache) return;

		favorito = Math.abs(favorito - 1);
		linha.favorita = favorito;

		await cache.salvar(linha);
	};
</script>

<header>
	<nav>
		<a href={page.url.searchParams.get('v') ? '/favoritos' : '/'}><ChevronLeft />voltar</a>
		<button onclick={alternar_favorito}
			><Heart fill={favorito == 1 ? 'var(--cor-texto)' : 'transparent'} /></button
		>
	</nav>
	<h1>nome da empresa</h1>
	<h2 style={`font-size: ${linha.nome.length < 20 ? '2rem' : '1.5rem'}`}>
		{#if linha.codigo}
			{`${linha.codigo} |`}
		{/if}

		{linha.nome}
	</h2>
	{#if linha.detalhe}
		<p>
			{linha.detalhe}
		</p>
	{/if}
</header>
<div class="wrapper-filtros">
	<NavegacaoDias {linha} {dia} />
</div>
<main>
	{#each servicos as servico}
		<Colapsavel titulo={servico.sentido ?? ''}>
			<TabelaHorarios horarios={servico.horarios} />
		</Colapsavel>
	{/each}
</main>

<style>
	div.wrapper-filtros {
		margin-block: 16px;
	}
	main {
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
		color: var(--cor-texto);
		text-decoration: none;
		display: flex;
	}
	p {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
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
