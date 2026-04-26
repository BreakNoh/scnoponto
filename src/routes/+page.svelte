<script lang="ts">
	import CaixaPesquisa from '$lib/comps/CaixaPesquisa.svelte';
	import NavPaginas from '$lib/comps/NavPaginas.svelte';
	import { type ItemPesquisa } from '$lib/tipos';
	import { Search, SearchX } from '@lucide/svelte';

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
	<CaixaPesquisa bind:resultados bind:query />
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
			<p>nenhuma linha encontrada</p>
		</div>
	{:else}
		<div class="card-nao-resultado">
			<Search />
			<p>as linhas aparecem aqui</p>
		</div>
	{/if}
</main>

<NavPaginas ativo="horarios" />

<style>
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
