<script lang="ts">
	import { page } from '$app/state';
	import { storeFiltros } from '$lib/stores/storeFiltros';
	import type { ItemPesquisa } from '$lib/tipos';
	import type { Attachment } from 'svelte/attachments';
	import { MediaQuery } from 'svelte/reactivity';

	let { children } = $props();
	let termo = $state('');
	let resultados = $state<ItemPesquisa[]>([]);

	const pesquisar = async (atualizar: boolean = true) => {
		if (termo.length < 3) return;

		const res = await fetch('/api/pesquisa', {
			method: 'post',
			body: JSON.stringify({ termo, filtros: $storeFiltros })
		});

		if (!res.ok) return;

		resultados = await res.json();

		if (atualizar && resultados.length > 0) {
			// atualizarEmpresas();
		}
	};

	const acaoPesquisa: Attachment = (elemRaw) => {
		const elem = elemRaw as HTMLInputElement;

		elem.addEventListener('input', pesquisar.bind(null, true));
	};

	let mobile = new MediaQuery('max-width: 650px');
</script>

<main style:padding-inline={mobile.current ? '0' : '8vw'}>
	{#if !page.params.emp || !mobile.current}
		<aside class="painel-pesquisa" style:max-width={mobile.current ? 'none' : '25vw'}>
			<div class="caixa-pesquisa">
				<input type="text" {@attach acaoPesquisa} bind:value={termo} />
			</div>
			<ul class="lista-resultados">
				{#each resultados as item}
					<li class="item-resultado">
						<a href={`/p/${item.slug}`}>{item.nome_linha}</a>
					</li>
				{/each}
			</ul>
		</aside>
	{/if}
	<div class="conteudo">
		{@render children()}
	</div>
</main>

<style>
	main {
		/* display: grid; */
		/* grid-template-columns: 25vw 1fr; */
		margin-top: 8px;

		@media (min-width: 650px) {
			display: grid;
			grid-template-columns: auto 1fr;
			margin-top: 16px;
			/* gap: 4px; */
		}
	}

	aside {
		/* background-color: var(--cor-fundo-alta); */
		padding-inline: 8px;
		@media (min-width: 650px) {
			padding-inline: 16px 0;
		}
	}

	ul.lista-resultados {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin: 0;

		padding-inline: 8px;

		list-style-type: none;
		margin-top: 8px;

		& li.item-resultado {
			background-color: var(--cor-fundo-alta);
			border-radius: 16px;

			& a {
				display: block;
				color: var(--cor-texto);
				text-decoration: none;

				padding-inline: 16px;
				padding-block: 8px;
			}
		}
	}

	div.caixa-pesquisa {
		display: grid;

		padding: 8px;
		background-color: var(--cor-principal);
		border-radius: 8px;

		& input {
			/* width: 100%; */
			min-width: 5rem;
			border-radius: 16px;

			border: none;
			outline: none;

			line-height: 1rem;

			padding-inline: 16px;
			padding-block: 8px;
		}
	}
</style>
