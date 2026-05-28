<script lang="ts">
	import SelecaoSentido from './SelecaoSentido.svelte';
	import TabelaHorario from './TabelaHorario.svelte';
</script>

<main>
	<div>
		<div>
			<h1><span>123</span> Linha Exemplo</h1>
			<span>via 1234 abc casa 1</span>
		</div>
		<ul>
			<li>🚍 nome da empresa</li>
			<li>💲R$ 6,90</li>
		</ul>
	</div>

	<!-- <h2>Saída: Não sei das quantas</h2> -->
	<SelecaoSentido />
	<TabelaHorario />
</main>

<style>
	main {
		margin-inline: 8px;

		@media (min-width: 700px) {
			/* margin-inline: auto; */
			display: grid;
			justify-content: center;
			grid-template-columns: minmax(400px, 750px);
		}
	}
</style>
