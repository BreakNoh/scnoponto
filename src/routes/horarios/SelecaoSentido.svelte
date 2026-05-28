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
		<h2>
			{atual}
		</h2>
		<ChevronRightIcon />
	</button>

	{#if page.state.selecionarSentido}
		<div class="opcoes">
			<ul>
				{#each ['SENTIDO ASDASDASDAl', 'sentido', 'ahhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhh'] as s}
					<button class="opcao" onclick={mudarAtual.bind(null, s)}>
						<h2>{s}</h2>
					</button>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	div.selecao-sentido {
		position: relative;
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
		max-width: 750px;
		background-color: white;
		width: 100%;

		border-radius: 16px;

		padding-block: 12px;
		padding-inline: 16px;

		border: 2px solid green;
		box-shadow: 0 8px green;
		margin-bottom: 8px;

		&:active {
			box-shadow: none;
			margin-top: 8px;
			margin-bottom: 0px;
		}
	}
</style>
