<script lang="ts">
	import Colapsavel from '$lib/comps/Colapsavel.svelte';
	import NavegacaoDias from '$lib/comps/NavegacaoDias.svelte';
	import TabelaHorarios from '$lib/comps/TabelaHorarios.svelte';
	import { ChevronLeft, ChevronRight, Heart } from '@lucide/svelte';

	import { page } from '$app/state';
	import { CODIGO_DIAS } from '$lib/utils.js';
	import { browser } from '$app/environment';
	import { storeIdioma } from '$lib/stores/storeIdioma.js';

	let { data } = $props();

	let { linha, dia, idxSentido } = $derived(data);
	let servicos = $derived(linha.servicos[dia]);
	let servico = $derived(servicos?.at(idxSentido));

	let favorito = $derived(data.favorito);

	const alternarFavorito = async () => {
		if (!browser) return;
		const db = await (await import('$lib/cache.js')).DB;
		const slug = `${page.params.empresa}/${page.params.linha}`;

		if (await db.get('favoritos', slug)) {
			await db.delete('favoritos', slug);
			favorito = false;
		} else {
			await db.put('favoritos', data.itemPesquisa);
			favorito = true;
		}
	};
</script>

<header>
	<nav>
		<a href={'/'}><ChevronLeft />{$storeIdioma.gen.voltar}</a>
		<button onclick={alternarFavorito}>
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
	<NavegacaoDias dias={Object.keys(linha.servicos)} ativo={dia} />
</div>

{#snippet ListaSentidos()}
	{#each linha.servicos[dia] as { sentido }, i}
		{@const { empresa, linha } = page.params}
		{#if i != data.idxSentido}
			<li>
				<a
					href={`/horarios/${empresa}/${linha}/${CODIGO_DIAS.get(dia ?? 0)}/${i}`}
					data-sveltekit-replacestate
					class="item-sentido"
				>
					<ChevronRight />
					<span>
						{sentido.replace(/sa(i|í)da(s)?\s+(d(a|o)\s+)?/gi, '')}
					</span>
				</a>
			</li>
		{/if}
	{/each}
{/snippet}

<main>
	{#if servico}
		<Colapsavel titulo={servico.sentido} flutua>
			<div class="wrapper-lista">
				<ul class="lista-sentidos">
					{@render ListaSentidos()}
				</ul>
			</div>
		</Colapsavel>
		<TabelaHorarios horarios={servico.horarios} sentido={servico.sentido} />
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
		color: var(--cor-texto);
		text-decoration: none;

		align-items: center;

		&.item-sentido {
			flex: 1;
		}
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
