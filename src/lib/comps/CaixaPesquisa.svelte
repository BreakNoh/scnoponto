<script lang="ts">
	import { Search } from '@lucide/svelte';
	import type { ItemPesquisa } from '$lib/tipos';
	import { storeIdioma } from '$lib/stores/storeIdioma';
	import { storeFiltros } from '$lib/stores/storeFiltros';

	let {
		resultados = $bindable([]),
		query = $bindable('')
	}: { resultados: ItemPesquisa[]; query?: string } = $props();

	async function pesquisar(query: string = '') {
		if (query.length < 3) return;

		const pesquisa = await fetch(`/pesquisa`, {
			method: 'POST',
			body: JSON.stringify({
				termo: query,
				filtroEmpresa: $storeFiltros
			})
		});

		if (!pesquisa.ok) return;

		resultados = (await pesquisa.json()) as any[];
	}

	const atualizar = (ev: Event) => {
		const el = ev.target as HTMLInputElement;
		pesquisar(el.value);
	};
</script>

<form class="caixa-pesquisa">
	<input
		type="search"
		oninput={atualizar}
		bind:value={query}
		placeholder={$storeIdioma.genericos.pesquisarLinha}
	/>
	<div class="wrapper-icone">
		<Search />
	</div>
</form>

<style>
	form {
		display: flex;
		position: relative;
		width: 100%;
	}
	div.wrapper-icone {
		pointer-events: none;
		display: grid;
		place-items: center;

		position: absolute;
		left: 1rem;
		top: 0;
		bottom: 0;
		color: var(--cor-texto);
	}
	input {
		width: 100%;
		line-height: 2rem;
		font-size: 1rem;
		outline: none;
		color: var(--cor-texto);
		background-color: var(--cor-fundo-base);

		border: none;
		border-radius: 16px;
		padding-block: 0.5rem;
		padding-inline: 3rem 1rem;
	}
</style>
