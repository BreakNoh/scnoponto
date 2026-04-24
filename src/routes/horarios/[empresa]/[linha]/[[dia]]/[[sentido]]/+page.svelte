<script lang="ts">
	import Colapsavel from '$lib/comps/Colapsavel.svelte';
	import NavegacaoDias from '$lib/comps/NavegacaoDias.svelte';
	import TabelaHorarios from '$lib/comps/TabelaHorarios.svelte';
	import { ChevronLeft, ChevronRight, Heart } from '@lucide/svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type CacheLinha from '$lib/cache';
	import { CODIGO_DIAS } from '$lib/linhas.js';

	let { data } = $props();

	let linha = $derived(data.linha);
	let dia = $derived(data.dia);

	let servicos = $derived(linha.servicos.get(dia) ?? []);
	let servicoAtual = $derived(servicos?.at(data.idxSentido));

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
		<button onclick={alternar_favorito}>
			<Heart fill={favorito ? 'var(--cor-texto-alt)' : 'transparent'} /></button
		>
	</nav>
	<h1>{linha.empresa}</h1>
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

<div class="wrapper-nav">
	<NavegacaoDias {linha} ativo={dia} />
</div>

{#snippet ListaSentidos()}
	<ul class="lista-sentidos">
		{#each servicos as { sentido }, i}
			{#if i != data.idxSentido}
				<li>
					<a
						href={`${linha.endpoint}/${CODIGO_DIAS.get(dia) ?? 'util'}/${i}`}
						data-sveltekit-replacestate
					>
						<ChevronRight />
						<span>
							{sentido}
						</span>
					</a>
				</li>
			{/if}
		{/each}
	</ul>
{/snippet}

<main>
	{#if servicoAtual}
		<Colapsavel titulo={servicoAtual.sentido ?? ''} flutua>
			<div class="wrapper-lista">
				{@render ListaSentidos()}
			</div>
		</Colapsavel>
		<TabelaHorarios horarios={servicoAtual.horarios} sentido={servicoAtual.sentido} />
	{/if}
</main>

<style>
	div.wrapper-lista {
		background-color: var(--cor-fundo-base);
		padding-bottom: 8px;
	}
	ul.lista-sentidos::before {
		position: absolute;
		content: '';
		left: 0;
		top: 0;
		bottom: 0;
		width: 8px;
		background-color: var(--cor-principal);
		border-radius: 8px 0 0 8px;
	}

	ul.lista-sentidos {
		position: relative;
		display: flex;
		flex-direction: column;

		background-color: var(--cor-fundo-media);
		padding: 16px;
		margin-block: 0;
		margin-top: 8px;
		border-radius: 8px;

		gap: 8px;

		& a {
			font-size: 1.5rem;
			overflow: hidden;
		}

		& a span {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	li {
		list-style-type: none;
		display: flex;
	}

	a {
		display: grid;
		grid-template-columns: auto 1fr;
		flex: 1;
		color: var(--cor-texto);
		text-decoration: none;

		align-items: center;
	}

	div.wrapper-nav {
		margin-block: 16px;
		padding-inline: 16px;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 32px;

		@media (min-width: 650px) {
			flex-direction: row;
		}
	}

	nav {
		display: flex;
		margin-bottom: 4px;
		justify-content: space-between;
		color: var(--cor-texto-alt);
	}
	nav a {
		color: var(--cor-texto-alt);
		text-decoration: none;
		align-items: center;
		display: flex;
	}
	nav button {
		background-color: transparent;

		border: none;
	}

	p {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		color: var(--cor-texto-sec-alt);
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
