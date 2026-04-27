<script lang="ts">
	import { browser } from '$app/environment';
	import Colapsavel from '$lib/comps/Colapsavel.svelte';
	import NavPaginas from '$lib/comps/NavPaginas.svelte';
	import { storeTema } from '$lib/stores/storeTema';
	import { CORES } from '$lib/temas';
	import { type LucideIcon } from '@lucide/svelte';

	const alternarTema = () => {
		$storeTema.escuro = !$storeTema.escuro;
		if (!browser) return;

		localStorage.setItem('temaEscuro', `${$storeTema.escuro}`);
	};
	const mudarCor = (cor: string) => {
		$storeTema.primaria = cor;
		if (!browser) return;

		localStorage.setItem('temaCor', cor);
	};
</script>

<NavPaginas ativo="menu" />

{#snippet Opcao(nome: string, link: string, Icone: LucideIcon)}
	<li>
		<Icone />
		<span>{nome}</span>
	</li>
{/snippet}

<main>
	<ul>
		<li>
			asdasd
			<Colapsavel titulo="">a</Colapsavel>
		</li>
		<li><button onclick={alternarTema}> tema </button></li>

		{#each CORES.entries() as [nome, cor]}
			<li>
				<button onclick={mudarCor.bind(null, cor)} style:background-color={cor}>{nome}</button>
			</li>
		{/each}
	</ul>
</main>

<style>
	ul {
		padding: 0;
	}
	li {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
	}
</style>
