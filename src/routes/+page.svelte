<script lang="ts">
	import CaixaPesquisa from '$lib/comps/CaixaPesquisa.svelte';
	import LinhaFixada from '$lib/comps/LinhaFixada.svelte';
	import ListaResultados from '$lib/comps/ListaResultados.svelte';
	import { LINHA_TESTE, type ItemLinha } from '$lib/linhas';
	import type { Dia, Linha } from '$lib/tipos';

	let resultados = $state<ItemLinha[]>([]);
	let pesquisando = $state(false);
	let { data } = $props();

	let fixados: Linha[] = $state([LINHA_TESTE]);
	let dia: Dia = 'dias-uteis';
</script>

<header>
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
</style>
