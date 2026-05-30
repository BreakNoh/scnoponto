<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import BarraPesquisa from './BarraPesquisa.svelte';
	import ItemPesquisa from './ItemPesquisa.svelte';
	import { XIcon } from '@lucide/svelte';

	import { gerarPaleta, storeTema } from '$lib/stores/tema.svelte';
	import { onMount } from 'svelte';

	let pesquisando = $state(false);
	let mobile = new MediaQuery('max-width: 700px');

	onMount(() => {
		console.log(
			gerarPaleta({
				cor: 'green',
				tema: 'escuro'
			})
		);
	});

	const focar = () => (pesquisando = true);
</script>

{#snippet ItemPesquisado()}
	<ItemPesquisa codigo="abcdefg" linha="linha 1234" empresa="empresa exemplar" url="#">
		<button class="apagar-item"><XIcon /></button>
	</ItemPesquisa>
{/snippet}

<main>
	<div class="conteiner-pesquisa" class:topo={pesquisando}>
		<BarraPesquisa placeholder="Pesquisar linhas..." onfocusin={focar} />
	</div>
	<ul>
		<ItemPesquisa linha="Linha abc" empresa="empresa" url="horarios" />
		<ItemPesquisa linha="Linha abcsdajdakjsdhajkshdkajshdjk" empresa="empresa" url="horarios" />
		<ItemPesquisa
			linha="Linha abc sjdhgagsdagshd akjshdka gsdgaas ddag dg iajakjsdashdjkahkdhakshdkads"
			empresa="empresa"
			codigo="1239"
			url="horarios"
		/>
	</ul>
</main>

<style>
	:root {
		/* background-color: green; */
	}

	main {
		margin-inline: 8px;
		margin-top: 16px;
		display: grid;
		justify-content: center;

		@media (min-width: 700px) {
			margin-top: 64px;
			grid-template-columns: minmax(0, min(40rem, 400px));
		}

		@media (min-width: 1100px) {
			grid-template-columns: minmax(0, min(50rem, 700px));
		}
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
