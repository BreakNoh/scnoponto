<script lang="ts">
	import NavegacaoDias from '$lib/comps/NavegacaoDias.svelte';
	import TabelaHorarios from '$lib/comps/TabelaHorarios.svelte';
	import type { Horario, Servico, Linha } from '$lib/tipos';
	import { ChevronLeft, Heart } from '@lucide/svelte';

	const horarios: Horario[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((v) => ({
		hora: `0${v}:0${v}`,
		obs: []
	}));

	horarios[2].obs.push('a');
	const servico: Servico = {
		horarios,
		dias: 'dias-uteis',
		sentido: 'volta'
	};

	const servico_a = { ...servico };
	servico_a.sentido = 'ida';

	const linha_teste: Linha = {
		id: 0,
		nome: 'linha teste',
		servicos: new Map([
			['dias-uteis', [servico, servico_a]],
			['sabado', [servico, servico_a]]
		])
	};

	let favorito = $state(false);
	const alternar_favorito = () => (favorito = !favorito);
</script>

<header>
	<nav>
		<a href="/"><ChevronLeft />voltar</a>
		<button onclick={alternar_favorito}><Heart fill={favorito ? 'black' : 'transparent'} /></button>
	</nav>
	<h1>nome da empresa</h1>
	<h2>nome da linha</h2>
	<span>
		<abbr title="123 - nome da linha">123</abbr>
	</span>
</header>
<NavegacaoDias linha={linha_teste} hoje={'dias-uteis'} />
<main>
	<TabelaHorarios servico={servico_a} />
	<TabelaHorarios {servico} />
</main>

<style>
	header {
		background-color: lightskyblue;
		padding-inline: 1rem;
		padding-block: 1rem 2rem;
		border-radius: 0 0 16px 16px;
		margin-bottom: 1rem;
	}

	main {
		margin-top: 1rem;
		padding-inline: clamp(4px, 5vw, 30rem);

		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media (min-width: 650px) {
			flex-direction: row;
		}
	}
	nav {
		display: flex;
		justify-content: space-between;
	}
	nav a {
		color: black;
		text-decoration: none;
		display: flex;
	}
	nav button {
		background-color: transparent;
		border: none;
	}
	h1 {
		margin-bottom: 0;
		font-size: 1rem;
	}
	h2 {
		margin-block: 0;
		font-size: 2rem;
	}
</style>
