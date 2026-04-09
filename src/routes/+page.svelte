<script lang="ts">
	import TabelaHorarios from '$lib/comps/TabelaHorarios.svelte';
	import type { Horario, Servico } from '$lib/tipos';

	const horarios: Horario[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((v) => ({
		hora: `0${v}:0${v}`,
		obs: []
	}));

	horarios[2].obs.push('a');
	const servico: Servico = {
		horarios,
		dias: 0,
		sentido: 'volta'
	};
	const servico_a = { ...servico };
	servico_a.sentido = 'ida';
</script>

<nav>
	<a href="/">voltar</a>
	<button>favoritar</button>
</nav>
<header>
	<h1>nome da linha</h1>
	<abbr title="123 - nome da linha">123</abbr>
	<h2>nome da empresa</h2>
</header>
<main>
	<TabelaHorarios servico={servico_a} />
	<TabelaHorarios {servico} />
</main>
<nav id="escolha-dia">
	<button>dias úteis</button>
	<button>sábados</button>
	<button>domingos e feriados</button>
</nav>
