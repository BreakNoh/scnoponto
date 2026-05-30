<script lang="ts">
	import { BusIcon, InfoIcon, ChevronsUpIcon } from '@lucide/svelte';
	import SelecaoSentido from './SelecaoSentido.svelte';
	import TabelaHorario from './TabelaHorario.svelte';
	import SelecaoDia from './SelecaoDia.svelte';

	let scrollado = $state(false);
</script>

<svelte:window
	onscrollend={() => {
		scrollado = window.scrollY > 300;
	}}
/>

<main>
	<div class="info">
		<div>
			<h1>
				<span class="codigo">123</span>
				Linha Exemplo aksjdlka ash dklajs jlash akjsdh akhd akjsd
			</h1>
		</div>
		<ul>
			<li><InfoIcon />via não sei das quantas</li>
			<li><BusIcon /> nome da empresa</li>
			<!-- <li>💲R$ 6,90</li> -->
		</ul>
	</div>

	{#if scrollado}
		<button
			class="voltar-topo"
			onclick={() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
				scrollado = false;
			}}><ChevronsUpIcon /></button
		>
	{/if}

	<SelecaoDia />
	<SelecaoSentido />
	<TabelaHorario />
</main>

<style>
	button.voltar-topo {
		position: fixed;
		bottom: 32px;
		right: 32px;

		border-radius: 50%;
		width: 64px;
		aspect-ratio: 1 / 1;
		border: none;
	}
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
		margin-top: 8px;
	}
	h1 {
		font-size: 1.5rem;
		padding-inline: min(0.5rem, 8px);

		@media (min-width: 700px) {
			font-size: 2rem;
		}

		margin-bottom: 4px;
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
