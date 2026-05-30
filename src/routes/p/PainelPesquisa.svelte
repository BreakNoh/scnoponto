<script lang="ts">
	import { storeFiltros } from '$lib/stores/storeFiltros';
	import type { ItemPesquisa } from '$lib/tipos';
	import { SearchIcon, XIcon } from '@lucide/svelte';

	let resultados = $state<ItemPesquisa[]>([
		{
			codigo_linha: 'abc',
			nome_empresa: 'emnpresa',
			nome_linha: 'asdasda',
			slug: 'dadas-asdasd'
		}
	]);
	let ativo: ItemPesquisa | null = $state(null);
	let query = $state('');

	const handlerPesquisa = async (ev: Event) => {
		const elemento = ev.target as HTMLInputElement;
		const query = elemento.value;

		if (query.length < 3) return;

		const res = await fetch('/api/pesquisa', {
			method: 'post',
			body: JSON.stringify({ query, filtros: $storeFiltros })
		});

		if (!res.ok) return;

		resultados = await res.json();
	};
</script>

<div class="conteiner-pesquisa">
	<div class="caixa-pesquisa">
		<input type="text" bind:value={query} oninput={handlerPesquisa} placeholder="Pesquisar..." />

		<div class={['icone', 'lupa']}>
			<SearchIcon />
		</div>

		{#if query}
			<div class={['icone', 'limpar']}>
				<button
					onclick={() => {
						query = '';
						resultados = [];
					}}
				>
					<XIcon />
				</button>
			</div>
		{/if}
	</div>
</div>
<ul class="lista-resultados">
	{#each resultados as item}
		<li class="item-resultado" class:ativo={item == ativo}>
			<a href={`/p/${item.slug}`} onclick={() => (ativo = item)}>
				{#if item.codigo_linha}
					{`${item.codigo_linha}|${item.nome_linha}`}
				{:else}
					{item.nome_linha}
				{/if}
				<span>
					{item.nome_empresa}
				</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	div.conteiner-pesquisa {
		background-color: var(--cor-principal);
		padding: 16px;
		border-radius: 0 0 16px 16px;
	}
	div.caixa-pesquisa {
		display: flex;
		position: relative;

		& div.icone {
			position: absolute;

			&.lupa {
				left: 16px;
				top: 16px;
			}

			&.limpar {
				right: 16px;
				top: 16px;
			}
		}

		& button {
			padding: 0;
			background-color: transparent;
			border: none;
		}

		input {
			flex: 1;
			line-height: 1rem;
			font-size: 1rem;
			min-width: 0;

			padding-block: 16px;
			padding-inline: 48px;

			border-radius: 32px;
			border: none;
			/* background-color:; */
			/* border: 1px var(--cor-principal) solid; */
			outline: none;
		}
	}

	ul {
		list-style: none;
		padding: 0;
		padding-inline: 16px;
		display: grid;
		gap: 4px;
	}
	li {
		background-color: var(--cor-fundo-alta);
		border-radius: 16px;
		/* border: 1px var(--cor-principal) solid; */

		&.ativo {
			background-color: var(--cor-principal);
		}
	}
	a {
		display: block;
		padding-inline: 16px;
		padding-block: 16px;
		color: var(--cor-texto);
		text-decoration: none;

		& span {
			display: block;
			font-size: 0.8rem;
		}
	}
</style>
