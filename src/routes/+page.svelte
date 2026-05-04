<script lang="ts">
	import CaixaPesquisa from '$lib/comps/CaixaPesquisa.svelte';
	import NavPaginas from '$lib/comps/NavPaginas.svelte';
	import { storeIdioma } from '$lib/stores/storeIdioma';
	import { type ItemPesquisa } from '$lib/tipos';
	import { CircleCheck, CircleDashed, ListFilter, Search, SearchX } from '@lucide/svelte';

	let resultados: ItemPesquisa[] = $state([]);
	let query: string = $state('');
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
	<div class="acoes-pesquisa">
		<CaixaPesquisa bind:resultados bind:query />
		<button class="item-header"><ListFilter /></button>
	</div>
</header>
<main>
	{#if resultados.length > 0}
		<ul>
			{#each resultados as i}
				{@render ItemResultado(i)}
			{/each}
		</ul>
	{:else if query.length > 0}
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

<div class="filtros">
	<div class="botoes-filtro">
		<button>todas</button>
		<button style:background-color="var(--cor-principal)">ok</button>
	</div>
	<ul>
		{#each Array(20) as _, i}
			<li>
				<button class:ativo={i & 1}>
					{#if i & 1}
						<CircleDashed />
					{:else}
						<CircleCheck />
					{/if}

					NOME DA EMPRESA
				</button>
			</li>
		{/each}
	</ul>
</div>

<NavPaginas ativo="horarios" />

<style>
	header div.acoes-pesquisa {
		display: grid;
		gap: 8px;
		grid-template-columns: 1fr auto;
		justify-items: end;
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

	div.filtros ul {
		display: grid;
		padding-inline: 16px;
		gap: 8px;
		max-height: 50vh;
		overflow-y: auto;
	}

	div.filtros ul button {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-align: start;
		gap: 16px;

		padding: 16px;
		width: 100%;
		background-color: var(--cor-fundo-media);
		border-style: none;
		border-radius: 8px;
		color: var(--cor-texto);

		&.ativo {
			background-color: var(--cor-principal);
		}
	}
	.item-header {
		align-items: center;
		background-color: transparent;
		border: none;
		/* margin-top: 8px; */
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
