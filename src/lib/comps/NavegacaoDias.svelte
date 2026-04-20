<script lang="ts">
	import type { Linha, Dia } from '$lib/tipos';

	let { linha, dia: hoje }: { linha: Linha; dia?: Dia } = $props();

	let dias = $derived.by(() => linha.servicos.keys());

	const NOMES_DISPLAY_LONGO = new Map([
		['dias-uteis', 'Dias Úteis'],
		['sabado', 'Sábados'],
		['domingo-feriados', 'Domingos']
	]);
	const NOMES_DISPLAY_CURTO = new Map([
		['dias-uteis', 'Úteis'],
		['sabado', 'Sáb'],
		['domingo-feriados', 'Dom']
	]);
</script>

<nav>
	{#each dias as dia}
		<a href={`/linhas/${linha.id}/${dia}`} class:hoje={hoje == dia}>
			<span class="longo">
				{NOMES_DISPLAY_LONGO.get(dia)}
			</span>
			<span class="curto">
				{NOMES_DISPLAY_CURTO.get(dia)}
			</span>
		</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		/* width: 100%; */
		justify-content: center;
		gap: 0.5rem;
		padding-inline: 16px;
	}
	a {
		text-decoration: none;
		background-color: lightgrey;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		border-radius: 8px;

		text-align: center;
		width: 5rem;

		color: black;
	}

	span.curto {
		display: none;
	}

	@media (max-width: 400px) {
		span.curto {
			display: block;
		}
		span.longo {
			width: 3rem;
			display: none;
		}
	}

	a.hoje {
		background-color: lightskyblue;
		border-radius: 16px;
	}
</style>
