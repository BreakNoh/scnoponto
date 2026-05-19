<script lang="ts">
	import TabelaHorarios from './TabelaHorarios.svelte';
	import { ChevronLeft, ChevronRight, Heart } from '@lucide/svelte';

	import { page } from '$app/state';
	import { CODIGO_DIAS } from '$lib/utils.js';
	import { MediaQuery } from 'svelte/reactivity';
	import SelecaoSentido from './SelecaoSentido.svelte';
	import SelecaoDia from './SelecaoDia.svelte';

	let { data } = $props();

	let { linha, dia } = $derived(data);

	let idxServico = $state(0);
	let servicos = $derived(linha.servicos[dia]);
	let servico = $derived(servicos?.at(idxServico));
	let mudarServico = $state(false);

	let favorito = $derived(data.favorito);
	let telaPequena = new MediaQuery('max-width: 650px');
	const slug = $derived(data.itemPesquisa?.slug);

	// const alternarFavorito = async () => {
	// 	if (!browser) return;
	// 	const db = await (await import('$lib/cache.js')).DB;
	//
	// 	if (await db.get('favoritos', slug)) {
	// 		await db.delete('favoritos', slug);
	// 		favorito = false;
	// 	} else {
	// 		await db.put('favoritos', data.itemPesquisa);
	// 		favorito = true;
	// 	}
	// };
</script>

<header>
	<h1>
		{#if linha.codigo}
			{`${linha.codigo}|${linha.nome}`}
		{:else}
			{linha.nome}
		{/if}

		<button onclick={alternarFavorito} class="botao-fav">
			<Heart fill={favorito ? 'var(--cor-texto-alt)' : 'transparent'} size="32px" /></button
		>
	</h1>
	<h2>
		{linha.empresa}
	</h2>
	{#if linha.detalhe}
		<p>
			{linha.detalhe}
		</p>
	{/if}
</header>

<main>
	<SelecaoDia dias={Object.keys(linha.servicos)} atual={dia.toString()} {slug} />
	{#if telaPequena.current}
		<SelecaoSentido sentidos={servicos} bind:atual={idxServico} />
		{#if servico}
			<TabelaHorarios {servico} omitirSentido />
		{/if}
	{:else}
		{#each servicos as s}
			<TabelaHorarios servico={s} />
		{/each}
	{/if}
</main>

<style>
	main {
		padding-inline: 16px;
	}
	header {
		position: relative;
		padding-inline: 32px 16px;

		&::before {
			content: '';
			position: absolute;
			left: 16px;
			width: 8px;
			height: 100%;
			background-color: var(--cor-principal);
		}
	}
	p {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		color: var(--cor-texto-sec-alt);
	}

	h1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		font-size: 1.5rem;
	}

	h2 {
		margin-block: 0;
		font-size: 1rem;
	}

	button.botao-fav {
		border: none;
		background-color: transparent;
	}
</style>
