<script lang="ts">
	import CaixaPesquisa from '$lib/comps/CaixaPesquisa.svelte';
	import type { ItemLinha } from '$lib/linhas';

	let resultados: ItemLinha[] = $state([]);
</script>

<header>
	<CaixaPesquisa bind:resultados />
</header>
<main>
	<ul>
		{#each resultados as r}
			<li>
				<a href="">
					{r.nome}
				</a>
			</li>
		{/each}
	</ul>
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
