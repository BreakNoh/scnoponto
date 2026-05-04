<script lang="ts">
	import { browser } from '$app/environment';
	import type { OpcaoNavBar } from '$lib/comps/BarraNavegacao.svelte';
	import BarraNavegacao from '$lib/comps/BarraNavegacao.svelte';
	import NavPaginas from '$lib/comps/NavPaginas.svelte';
	import PopUp from '$lib/comps/PopUp.svelte';
	import { storeIdioma } from '$lib/stores/storeIdioma';
	import { storeTema } from '$lib/stores/storeTema';
	import { CORES } from '$lib/temas';
	import { ChevronLeft, ChevronRight, Moon, Sun, SunMoon, type LucideIcon } from '@lucide/svelte';

	const mudarTema = (escuro: boolean | undefined) => {
		$storeTema.escuro = escuro;
		if (!browser) return;

		if (escuro === null) {
			localStorage.removeItem('temaEscuro');
			return;
		}

		localStorage.setItem('temaEscuro', `${$storeTema.escuro}`);
	};
	const mudarCor = (cor: string) => {
		$storeTema.primaria = cor;
		if (!browser) return;

		localStorage.setItem('temaCor', cor);
	};

	const opcoesTema: OpcaoNavBar[] = $derived([
		{
			rotulo: $storeIdioma.aparencia.temas.sys,
			acao: mudarTema.bind(null, undefined),
			ativo: $storeTema.escuro === undefined,
			icone: SunMoon
		},
		{
			rotulo: $storeIdioma.aparencia.temas.esc,
			acao: mudarTema.bind(null, true),
			ativo: $storeTema.escuro === true,
			icone: Moon
		},
		{
			rotulo: $storeIdioma.aparencia.temas.cla,
			acao: mudarTema.bind(null, false),
			ativo: $storeTema.escuro === false,
			icone: Sun
		}
	]);
</script>

<a href="/menu" class="voltar"><ChevronLeft />{$storeIdioma.genericos.voltar}</a>
<main>
	<ul>
		<li>
			<h3>{$storeIdioma.aparencia.tema}</h3>
			<BarraNavegacao opcoes={opcoesTema} fixa={false} />
		</li>

		<li>
			<h3>{$storeIdioma.aparencia.cor}</h3>
			<div class="tabela-cores">
				{#each CORES.entries() as [nome, cor]}
					<button
						class="item-cor"
						onclick={mudarCor.bind(null, cor)}
						style:background-color={cor}
						class:ativo={$storeTema.primaria == cor}
						aria-label={nome}
					></button>
				{/each}
			</div>
		</li>
	</ul>
</main>

<style>
	a.voltar {
		display: flex;
		margin-inline: 16px;
		margin-top: 16px;
		align-items: center;
		text-decoration: none;
		color: var(--cor-texto);
	}
	ul {
		display: grid;
		gap: 16px;
		padding: 0;
	}
	h3 {
		text-align: center;
		font-size: 1.5rem;
		margin-block: 0 8px;
	}
	li {
		display: grid;
		align-items: center;
	}
	div.tabela-cores {
		display: grid;
		gap: 8px;
		padding: 16px;
		background-color: var(--cor-fundo-alta);
		border-radius: 16px;
		grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
		/* grid-template-rows: 1rem 1rem; */
	}
	button.item-cor {
		aspect-ratio: 1 / 1;
		border-radius: 8px;
		border-style: none;

		&.ativo {
			border-radius: 50%;
		}
	}
</style>
