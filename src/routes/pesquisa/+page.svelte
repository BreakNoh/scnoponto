<script lang="ts">
	import { browser } from '$app/environment';
	import { pushState, replaceState } from '$app/navigation';
	import Gaveta from '$lib/comps/Gaveta.svelte';
	import NavPaginas from '$lib/comps/NavPaginas.svelte';
	import { storeFiltros } from '$lib/stores/storeFiltros';
	import { storeIdioma } from '$lib/stores/storeIdioma';
	import { type ItemPesquisa } from '$lib/tipos';
	import { CircleCheck, CircleDashed, ListFilter, Search, SearchX } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	let resultados: ItemPesquisa[] = $state([]);
	let iniciado = $state(false);

	function alternarGaveta() {
		if (!browser) return;
		replaceState('', { mostrarGaveta: true });
	}

	const pesquisar: Attachment = (elemRaw) => {
		const elem = elemRaw as HTMLInputElement;

		elem.addEventListener('input', async () => {
			if (elem.value.length < 3) return;
			iniciado = true;

			const res = await fetch('/pesquisa', {
				method: 'post',
				body: JSON.stringify({ termo: elem.value, filtros: $storeFiltros })
			});

			if (!res.ok) return;

			resultados = await res.json();
		});
	};
</script>

{#snippet ItemResultado(item: ItemPesquisa)}
	<li>
		<a href={`/horarios/${item.slug}`}>
			<span class="nome-linha">
				{#if item.codigo_linha}
					{`${item.codigo_linha} | `}
				{/if}
				{item.nome_linha}
			</span>
			<span class="nome-empresa">{item.nome_empresa}</span>
		</a>
	</li>
{/snippet}

<header>
	<div class="caixa-pesquisa">
		<div class="icone-lupa">
			<Search class="" />
		</div>
		<input type="text" {@attach pesquisar} />
	</div>
	<button class="filtros" onclick={alternarGaveta}><ListFilter /></button>
</header>

<main>
	{#if resultados.length > 0}
		<ul>
			{#each resultados as i}
				{@render ItemResultado(i)}
			{/each}
		</ul>
	{:else if iniciado}
		<div class="card-nao-resultado">
			<SearchX />
			<p>{$storeIdioma.genericos.semResultados}</p>
		</div>
	{:else}
		<div class="card-nao-resultado">
			<Search />
			<p>{$storeIdioma.genericos.linhasAqui}</p>
		</div>
	{/if}
</main>

<Gaveta>abc</Gaveta>
<NavPaginas ativo="horarios" />

<style>
	header {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 8px;
	}

	div.caixa-pesquisa {
		position: relative;
		display: grid;

		& .icone-lupa {
			pointer-events: none;
			position: absolute;
			left: 4px;
			top: 4px;

			display: flex;
			place-content: center;

			width: 2rem;
			aspect-ratio: 1 / 1;
		}

		& input {
			padding-inline: calc(2rem + 8px) 8px;
			padding-block: 4px;

			line-height: 2rem;
			font-size: 1rem;

			border-style: none;
			border-radius: 8px;
		}
		& input:focus {
			outline: none;
		}
	}

	button.filtros {
		background-color: transparent;
		border: none;
	}

	div.filtros {
		background-color: var(--cor-fundo-alta);
		/* padding-inline: 16px; */
		padding-block: 8px;

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		z-index: 1;
		max-height: 75vh;
		/* overflow-y: auto; */
		border-radius: 16px 16px 0 0;
	}
	div.filtros div.botoes-filtro {
		display: flex;
		justify-content: space-between;
		margin-top: 8px;
		padding-inline: 16px;
	}

	div.filtros div.botoes-filtro button {
		background-color: var(--cor-fundo-media);
		color: var(--cor-texto);
		border-style: none;
		border-radius: 16px;
		padding: 16px;
		min-width: 5rem;
	}

	div.card-nao-resultado {
		margin-top: 16px;
		text-align: center;
		color: var(--cor-fundo-media);
	}
	div.card-nao-resultado p {
		margin-top: 4px;
	}

	ul {
		display: flex;
		flex-direction: column;
		margin-top: 8px;

		padding: 0;
		gap: 4px;
	}
	li {
		display: flex;
		list-style-type: none;
	}

	a::before {
		position: absolute;
		content: '';
		left: 0;
		top: 0;
		bottom: 0;
		width: 8px;
		background-color: var(--cor-principal);
		border-radius: 16px 0 0 16px;
	}

	a {
		flex: 1;
		display: grid;
		position: relative;

		text-decoration: none;
		color: var(--cor-texto);

		background-color: var(--cor-fundo-alta);
		border-radius: 8px;
		padding: 16px;
	}
	a span {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	a span.nome-linha {
		font-size: 1rem;
	}
	a span.nome-empresa {
		font-size: 0.75rem;
		color: var(--cor-texto-sec);
	}
</style>
