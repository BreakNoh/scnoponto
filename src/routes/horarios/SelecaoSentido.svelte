<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import { ChevronRightIcon } from '@lucide/svelte';

	let atual = $state('sentido 123');

	const mudarAtual = (s: string) => {
		atual = s;
		if (page.state.selecionarSentido) {
			history.back();
		}
	};
	const alternarEstado = () => {
		if (page.state.selecionarSentido) {
			history.back();
		} else {
			pushState('', { selecionarSentido: true });
		}
	};
</script>

<div class="selecao-sentido">
	<button onclick={alternarEstado} class="principal">
		{atual}
		<ChevronRightIcon />
	</button>

	{#if page.state.selecionarSentido}
		<ul>
			{#each ['SENTIDO ASDASDASDAl', 'sentido', 'ahhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhh'] as s}
				<button class="opcao" onclick={mudarAtual.bind(null, s)}>
					<h2>{s}</h2>
				</button>
			{/each}
		</ul>
	{/if}
</div>

<style>
	div.selecao-sentido {
		position: relative;

		padding-block: 0 8px;

		&:has(button.principal:active) {
			/* background-color: pink; */
			padding-block: 8px 0;
		}
	}

	div.opcoes {
		position: absolute;
		background-color: white;

		/* margin-top: 8px; */

		inset-inline: 0;
		/* display: flex; */
	}

	h2 {
		display: inline;
		grid-template-columns: 1fr auto;

		margin: 0;
		/* text-align: left; */

		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	ul {
		padding-inline: 8px;
	}

	button.opcao {
		display: block;
		max-width: 100%;
		margin-bottom: 8px;

		padding-block: 12px;
		padding-inline: 16px;

		background-color: white;
		border: 2px solid green;
		border-radius: 16px;
	}

	button.principal {
		display: grid;

		text-align: left;
		font-size: 100%;
		align-content: center;

		grid-template-columns: 1fr auto;

		max-width: 750px;
		width: 100%;

		background-color: white;

		border-radius: 16px;

		padding-block: 12px;
		padding-inline: 16px;

		border: 2px solid green;
		box-shadow: 0 8px green;

		&:active {
			box-shadow: none;
		}
	}
</style>
