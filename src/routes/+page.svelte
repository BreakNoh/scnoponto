<script lang="ts">
	import CaixaPesquisa from '$lib/comps/CaixaPesquisa.svelte';
	import LinhaFixada from '$lib/comps/LinhaFixada.svelte';
	import ListaResultados from '$lib/comps/ListaResultados.svelte';
	import { Menu } from '@lucide/svelte';

	import { LINHA_TESTE, type ItemLinha } from '$lib/linhas';
	import type { Dia, Linha } from '$lib/tipos';

	let resultados = $state<ItemLinha[]>([]);
	let pesquisando = $state(false);
	let { data } = $props();

	let fixados: Linha[] = $state([LINHA_TESTE]);
	let dia: Dia = 'dias-uteis';
</script>

<header>
	<nav>
		<h1>SC no ponto</h1>
		<a href="/"><Menu /></a>
	</nav>
	<CaixaPesquisa bind:resultados bind:focado={pesquisando} />
</header>
<main>
	{#if pesquisando}
		<ListaResultados {resultados} />
	{:else}
		{#each fixados as linha}
			<LinhaFixada {linha} {dia} />
		{/each}
	{/if}
</main>

<style>
	h1 {
		margin-block: 0;
		font-size: 1.5rem;
	}
	nav {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		align-items: center;
	}
</style>
