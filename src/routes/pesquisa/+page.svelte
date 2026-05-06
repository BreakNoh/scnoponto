<script lang="ts">
	import { browser } from '$app/environment';
	import { pushState, replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import Gaveta from '$lib/comps/Gaveta.svelte';
	import NavPaginas from '$lib/comps/NavPaginas.svelte';
	import { storeFiltros } from '$lib/stores/storeFiltros';
	import { storeIdioma } from '$lib/stores/storeIdioma';
	import { type ItemPesquisa } from '$lib/tipos';
	import { CircleCheck, CircleDashed, ListFilter, Search, SearchX } from '@lucide/svelte';
	import type { Attachment } from 'svelte/attachments';

	let resultados: ItemPesquisa[] = $state([]);
	let iniciado = $state(false);
	const regioes = ['grande florianópolis', 'sul', 'serra', 'norte', 'oeste', 'vale do itajaí'];

	function alternarGaveta() {
		if (!browser) return;

		if (page.state.mostrarGaveta) {
			history.back();
			return;
		}

		pushState('', { mostrarGaveta: true });
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
		<a href={`/horarios/${item.slug}`} class="item-resultado">
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
		<ul class="lista-resultados">
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

<Gaveta>
	<h3>regiões</h3>
	<ul class="regioes">
		{#each regioes as reg, i}
			<li>
				<button class="botao-filtro" class:ativo={i & 1}>{reg}</button>
			</li>
		{/each}
	</ul>
</Gaveta>
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

	ul.regioes {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	button.botao-filtro {
		padding-inline: 16px;
		padding-block: 8px;

		background-color: transparent;

		border: 1px solid var(--cor-principal);
		border-radius: 16px;
		color: var(--cor-texto);

		&.ativo {
			background-color: var(--cor-principal);
			color: var(--cor-texto-alt);
		}
	}

	button.filtros {
		background-color: transparent;
		border: none;
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
		padding: 0;
	}

	ul.lista-resultados {
		display: flex;
		flex-direction: column;
		margin-top: 8px;

		gap: 4px;
	}
	li {
		display: flex;
		list-style-type: none;
	}

	a.item-resultado::before {
		position: absolute;
		content: '';
		left: 0;
		top: 0;
		bottom: 0;
		width: 8px;
		background-color: var(--cor-principal);
		border-radius: 16px 0 0 16px;
	}

	a.item-resultado {
		flex: 1;
		display: grid;
		position: relative;

		text-decoration: none;
		color: var(--cor-texto);

		background-color: var(--cor-fundo-alta);
		border-radius: 8px;
		padding: 16px;

		& span {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;

			&.nome-linha {
				font-size: 1rem;
			}
			&.nome-empresa {
				font-size: 0.75rem;
				color: var(--cor-texto-sec);
			}
		}
	}
</style>
