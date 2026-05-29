<script lang="ts">
	import { BusIcon } from '@lucide/svelte';
	import SelecaoSentido from './SelecaoSentido.svelte';
	import TabelaHorario from './TabelaHorario.svelte';
	import SelecaoDia from './SelecaoDia.svelte';
</script>

<main>
	<div class="info">
		<div>
			<h1>
				<span class="codigo">123</span>
				Linha Exemplo aksjdlka ash dklajs jlash akjsdh akhd akjsd
			</h1>
			<p>via 1234 abc casa 1</p>
		</div>
		<ul>
			<li><BusIcon /> nome da empresa</li>
			<!-- <li>💲R$ 6,90</li> -->
		</ul>
	</div>

	<SelecaoDia />
	<SelecaoSentido />
	<TabelaHorario />
</main>

<style>
	span.codigo {
		background-color: green;
		color: white;
		padding-block: 4px;
		padding-inline: 8px;
		border-radius: 16px;

		margin-right: 0.25rem;
	}

	ul {
		list-style: none;
		padding-left: 16px;
		margin-top: 0;
	}
	h1 {
		/* display: flex; */
		/* flex-wrap: wrap; */

		margin-bottom: 4px;
	}
	p {
		margin-left: 16px;
		margin-block: 8px;
	}
	li {
		display: flex;
		gap: min(1rem, 8px);
	}
	main {
		margin-top: 8px;
		margin-inline: 8px;

		@media (min-width: 700px) {
			/* margin-inline: auto; */
			margin-top: 16px;
			display: grid;
			justify-content: center;
			grid-template-columns: minmax(400px, 750px);
		}
	}
</style>
