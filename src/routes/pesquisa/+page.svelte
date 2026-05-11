<script lang="ts">
	import { browser } from '$app/environment';
	import { pushState, replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import Gaveta from '$lib/comps/Gaveta.svelte';
	import NavPaginas from '$lib/comps/NavPaginas.svelte';
	import { storeFiltros } from '$lib/stores/storeFiltros';
	import { storeIdioma } from '$lib/stores/storeIdioma';
	import { type ItemPesquisa } from '$lib/tipos';
	import { CircleCheck, CircleDashed, ListFilter, Search, SearchX, X } from '@lucide/svelte';
	import type { Attachment } from 'svelte/attachments';

	let resultados: ItemPesquisa[] = $state([]);
	let empresasResultados = $state<string[]>($storeFiltros?.emp ?? []); // evita duplicatas
	let iniciado = $state(false);
	let termo = $state('');
	const regioes = ['grande florianópolis', 'sul', 'serra', 'norte', 'oeste', 'vale do itajaí'];

	function atualizarEmpresas() {
		empresasResultados = [...new Set(resultados.map((v) => v.nome_empresa))].sort();
	}

	function alternarGaveta() {
		if (!browser) return;

		if (page.state.mostrarGaveta) {
			history.back();
			return;
		}

		pushState('', { mostrarGaveta: true });
	}

	const pesquisar = async (atualizar: boolean = true) => {
		if (termo.length < 3) return;
		iniciado = true;

		const res = await fetch('/pesquisa', {
			method: 'post',
			body: JSON.stringify({ termo, filtros: $storeFiltros })
		});

		if (!res.ok) return;

		resultados = await res.json();

		if (atualizar && resultados.length > 0) {
			atualizarEmpresas();
		}
	};

	const acaoPesquisa: Attachment = (elemRaw) => {
		const elem = elemRaw as HTMLInputElement;

		elem.addEventListener('input', pesquisar.bind(null, true));
	};

	const filtrarEmpresa = (emp: string) => {
		const empNorm = emp.trim();
		let atualizar = false;

		if (!$storeFiltros.emp) {
			$storeFiltros.emp = [empNorm];
		} else if (!$storeFiltros.emp.includes(empNorm)) {
			$storeFiltros.emp.push(empNorm);
		} else {
			$storeFiltros.emp = $storeFiltros.emp.filter((v) => v != empNorm);
		}

		if ($storeFiltros.emp.length == 0) {
			$storeFiltros.emp = undefined;
			atualizar = true;
		}

		storeFiltros.update((v) => v);
		pesquisar(atualizar);
	};
	const filtrarReg = (reg: string) => {
		const regNorm = reg.trim();
		let atualizar = false;

		if (!$storeFiltros.reg) {
			$storeFiltros.reg = [regNorm];
		} else if (!$storeFiltros.reg.includes(regNorm)) {
			$storeFiltros.reg.push(regNorm);
		} else {
			$storeFiltros.reg = $storeFiltros.reg.filter((v) => v != regNorm);
		}

		if ($storeFiltros.reg.length == 0) {
			$storeFiltros.reg = undefined;
			atualizar = true;
		}

		storeFiltros.update((v) => v);
		pesquisar(atualizar);
	};
</script>

{#snippet ItemResultado(item: ItemPesquisa)}
	<li>
		<a href={`/horarios/${item.slug}`} class="item-resultado">
			<span class="nome-linha">
				{#if item.codigo_linha}
					{`${item.codigo_linha} | `}
				{/if}
				{item.nome_linha}
			</span>
			<span class="nome-empresa">{item.nome_empresa}</span>
		</a>
	</li>
{/snippet}

<header>
	<div class="caixa-pesquisa">
		<div class="icone-lupa">
			<Search class="" />
		</div>
		<input type="text" {@attach acaoPesquisa} bind:value={termo} />
	</div>
	<button class="filtros" onclick={alternarGaveta} style:display="none"><ListFilter /></button>
</header>

<main>
	<ul class="barra-empresas">
		{#each empresasResultados as i}
			{@const ativo = $storeFiltros.emp?.includes(i.trim())}
			<li>
				<button class="botao-filtro" onclick={filtrarEmpresa.bind(null, i)} class:ativo>
					{#if ativo}
						<X size="1rem" />
					{/if}
					{i}
				</button>
			</li>
		{/each}
	</ul>

	{#if resultados.length > 0}
		<ul class="lista-resultados">
			{#each resultados as i}
				{@render ItemResultado(i)}
			{/each}
		</ul>
	{:else if iniciado}
		<div class="card-nao-resultado">
			<SearchX />
			<p>{$storeIdioma.pag.pesquisa.semResultado}</p>
		</div>
	{:else}
		<div class="card-nao-resultado">
			<Search />
			<p>{$storeIdioma.pag.pesquisa.linhasAqui}</p>
		</div>
	{/if}
</main>

<Gaveta>
	<h3>regiões</h3>
	<ul class="regioes">
		{#each regioes as reg, i}
			{@const ativo = $storeFiltros?.reg?.includes(reg)}
			<li>
				<button class="botao-filtro" class:ativo onclick={filtrarReg.bind(null, reg)}>
					{#if ativo}
						<X size="1rem" />
					{/if}
					{reg}</button
				>
			</li>
		{/each}
	</ul>
</Gaveta>

<NavPaginas ativo="horarios" />

<style>
	header {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 8px;
	}

	div.caixa-pesquisa {
		position: relative;
		display: grid;

		& .icone-lupa {
			pointer-events: none;
			position: absolute;
			left: 4px;
			top: 4px;

			display: flex;
			place-content: center;

			width: 2rem;
			aspect-ratio: 1 / 1;
		}

		& input {
			padding-inline: calc(2rem + 8px) 8px;
			padding-block: 4px;

			line-height: 2rem;
			font-size: 1rem;

			border-style: none;
			border-radius: 8px;
			background-color: white;
		}

		& input:focus {
			outline: none;
		}
	}

	ul.regioes {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	ul.barra-empresas {
		display: flex;
		overflow-x: auto;
		scrollbar-width: none;

		gap: 8px;
		& li {
			flex: none;
		}
	}
	ul button {
		display: flex;
	}
	button.botao-filtro {
		padding-inline: 16px;
		padding-block: 8px;

		background-color: transparent;

		border: 1px solid var(--cor-principal);
		border-radius: 16px;
		color: var(--cor-texto);

		&.ativo {
			background-color: var(--cor-principal);
			color: var(--cor-texto-alt);
		}
	}

	button.filtros {
		background-color: transparent;
		border: none;
	}

	div.card-nao-resultado {
		margin-top: 16px;
		text-align: center;
		color: var(--cor-fundo-media);
	}
	div.card-nao-resultado p {
		margin-top: 4px;
	}

	ul {
		padding: 0;
	}

	ul.lista-resultados {
		display: flex;
		flex-direction: column;
		margin-top: 8px;

		gap: 4px;
	}
	li {
		display: flex;
		list-style-type: none;
	}

	a.item-resultado::before {
		position: absolute;
		content: '';
		left: 0;
		top: 0;
		bottom: 0;
		width: 8px;
		background-color: var(--cor-principal);
		border-radius: 16px 0 0 16px;
	}

	a.item-resultado {
		flex: 1;
		display: grid;
		position: relative;

		text-decoration: none;
		color: var(--cor-texto);

		background-color: var(--cor-fundo-alta);
		border-radius: 8px;
		padding: 16px;

		& span {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;

			&.nome-linha {
				font-size: 1rem;
			}
			&.nome-empresa {
				font-size: 0.75rem;
				color: var(--cor-texto-sec);
			}
		}
	}
</style>
