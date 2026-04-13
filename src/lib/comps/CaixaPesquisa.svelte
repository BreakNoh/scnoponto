<script lang="ts">
	import { pushState } from '$app/navigation';

	import { Search } from '@lucide/svelte';
	import { LINHAS, type ItemLinha } from '$lib/linhas';
	import Fuse from 'fuse.js';
	import { onMount } from 'svelte';

	let {
		resultados = $bindable([]),
		focado = $bindable(false)
	}: { resultados: ItemLinha[]; focado: boolean } = $props();

	const fuse = new Fuse(LINHAS, {
		keys: ['nome', 'codigo', 'empresa'],
		threshold: 0.3,
		isCaseSensitive: false
	});

	pesquisar();

	onMount(() => {
		window.addEventListener('popstate', (ev) => {
			focado = !!ev.state.pesquisando;
		});
	});

	function pesquisar(query: string = '') {
		resultados = fuse.search(query).map((v) => v.item);
	}
	const atualizar = (ev: Event) => {
		focar(ev);

		const el = ev.target as HTMLInputElement;
		pesquisar(el.value);
	};
	const focar = (ev: Event) => {
		if (!focado) {
			pushState('', { pesquisando: true });
			focado = true;
			pesquisar((ev.target as HTMLInputElement).value);
		}
	};
</script>

<form class="caixa-pesquisa">
	<input
		type="search"
		oninput={atualizar}
		onclick={focar}
		class:focado
		placeholder="Pesquisar linha"
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
