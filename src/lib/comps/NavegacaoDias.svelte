<script lang="ts">
	import type { Linha, Dia } from '$lib/tipos';

	let { linha, hoje }: { linha: Linha; hoje?: Dia } = $props();

	let dias = $derived.by(() => linha.servicos.keys());
</script>

<nav>
	{#each dias as dia}
		<a href={`/linhas/${linha.id}/${dia}`} class={[{ hoje: hoje == dia }]}>{dia}</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		width: 100%;
		justify-content: center;
		gap: 0.5rem;
	}
	a {
		text-decoration: none;
		background-color: lightgrey;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		border-radius: 8px;

		width: 5rem;
		text-align: center;

		color: black;
	}
	a.hoje {
		background-color: lightskyblue;
		border-radius: 16px;
	}
</style>
