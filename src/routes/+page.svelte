<script lang="ts">
	import CaixaPesquisa from '$lib/comps/CaixaPesquisa.svelte';
	import LinhaFixada from '$lib/comps/LinhaFixada.svelte';
	import ListaResultados from '$lib/comps/ListaResultados.svelte';
	import { Menu } from '@lucide/svelte';

	import { type ItemLinha } from '$lib/linhas';
	import type { Dia, Linha } from '$lib/tipos';

	let resultados = $state<ItemLinha[]>([]);
	let pesquisando = $state(false);
	let { data } = $props();

	let fixados: Linha[] = $derived(data.fixados);
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
	main {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	h1 {
		margin-block: 0;
		font-size: 2rem;
	}
	nav {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		align-items: start;
	}
</style>
