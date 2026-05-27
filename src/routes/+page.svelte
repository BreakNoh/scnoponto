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

<header>HEADER</header>
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
	}
	header {
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 0;
	}

	div.conteiner-pesquisa {
		/* background-color: green; */
		/* padding: 16px; */

		@media (min-width: 700px) {
			margin-inline: auto;
			max-width: min(40rem, 600px);

			/* margin-top: 20vh; */
		}

		@media (min-width: 1100px) {
			margin-inline: auto;
			max-width: min(50rem, 800px);
		}
	}
</style>
