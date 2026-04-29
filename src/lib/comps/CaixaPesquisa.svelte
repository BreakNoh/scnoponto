<script lang="ts">
	import { Search } from '@lucide/svelte';
	import { LINHAS, type ItemLinha } from '$lib/linhas';
	import type { ItemPesquisa } from '$lib/tipos';
	import { storeIdioma } from '$lib/stores/storeIdioma';

	let {
		resultados = $bindable([]),
		query = $bindable('')
	}: { resultados: ItemPesquisa[]; query?: string } = $props();

	async function pesquisar(query: string = '') {
		const LIMITE_RESULTADOS = 8;

		const pesquisa = await fetch(`/pesquisa?q=${query}`);

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
