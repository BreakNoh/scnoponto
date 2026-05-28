<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import BarraPesquisa from './BarraPesquisa.svelte';
	import ItemPesquisa from './ItemPesquisa.svelte';
	import { XIcon } from '@lucide/svelte';

	let pesquisando = $state(false);
	let mobile = new MediaQuery('max-width: 700px');

	const focar = () => (pesquisando = true);
</script>

{#snippet ItemPesquisado()}
	<ItemPesquisa codigo="abcdefg" linha="linha 1234" empresa="empresa exemplar" url="#">
		<button class="apagar-item"><XIcon /></button>
	</ItemPesquisa>
{/snippet}

<header><h1>SCnoPONTO</h1></header>
<main>
	<div class="conteiner-pesquisa" class:topo={pesquisando}>
		<BarraPesquisa placeholder="Pesquisar linhas..." onfocusin={focar} />
	</div>
	<ul>
		<ItemPesquisa linha="Linha abc" empresa="empresa" url="#" />
		<ItemPesquisa linha="Linha abcsdajdakjsdhajkshdkajshdjk" empresa="empresa" url="#" />
		<ItemPesquisa
			linha="Linha abc sjdhgagsdagshd akjshdka gsdgaas ddag dg iajakjsdashdjkahkdhakshdkads"
			empresa="empresa"
			codigo="1239"
			url="#"
		/>
	</ul>
</main>

<style>
	:root {
		/* background-color: green; */
	}

	main {
		margin-inline: 8px;
		display: grid;
		justify-content: center;

		@media (min-width: 700px) {
			grid-template-columns: minmax(0, min(40rem, 400px));
		}

		@media (min-width: 1100px) {
			grid-template-columns: minmax(0, min(50rem, 700px));
		}
	}

	header {
		min-height: min(5rem, 64px);
		height: 10vh;
		background-color: green;

		display: grid;
		align-content: center;

		margin-bottom: 32px;
		padding-inline: 16px;

		box-shadow: 0 8px darkgreen;

		@media (min-width: 700px) {
			height: 12vh;
			margin-bottom: 32px;
			padding-inline: 5%;
		}
	}

	header h1 {
		margin: 0;
		font-size: max(1.5rem, 2vw);
	}

	ul {
		display: flex;

		flex-direction: column;
		gap: 16px;
		padding: 0;

		padding-inline: 16px;

		@media (min-width: 700px) {
			padding-inline: 32px;
		}
	}

	div.conteiner-pesquisa {
		/* background-color: green; */
		/* padding: 16px; */
	}
</style>
