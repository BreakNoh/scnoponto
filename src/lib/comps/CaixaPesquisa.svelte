<script lang="ts">
	import { Search } from '@lucide/svelte';
	import { LINHAS, type ItemLinha } from '$lib/linhas';
	import Fuse from 'fuse.js';

	let {
		resultados = $bindable([]),
		query = $bindable('')
	}: { resultados: ItemLinha[]; query?: string } = $props();

	const fuse = new Fuse(LINHAS, {
		keys: ['nome', 'codigo', 'empresa'],
		threshold: 0.3,
		isCaseSensitive: false
	});

	function pesquisar(query: string = '') {
		const LIMITE_RESULTADOS = 8;

		resultados = fuse
			.search(query)
			.map((v) => v.item)
			.filter((_, i) => i <= LIMITE_RESULTADOS);
	}

	const atualizar = (ev: Event) => {
		const el = ev.target as HTMLInputElement;
		pesquisar(el.value);
	};
</script>

<form class="caixa-pesquisa">
	<input type="search" oninput={atualizar} bind:value={query} placeholder="Pesquisar linha" />
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
	}
	input.focado {
		background-color: red;
	}
	input {
		width: 100%;
		line-height: 2rem;
		font-size: 1rem;
		outline: none;

		border: none;
		border-radius: 16px;
		padding-block: 0.5rem;
		padding-inline: 3rem 1rem;
	}
</style>
