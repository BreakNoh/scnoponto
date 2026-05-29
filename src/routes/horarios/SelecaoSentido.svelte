<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import { ChevronDownIcon, ChevronRightIcon } from '@lucide/svelte';

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

		{#if page.state.selecionarSentido}
			<ChevronDownIcon />
		{:else}
			<ChevronRightIcon />
		{/if}
	</button>

	{#if page.state.selecionarSentido}
		<ul>
			{#each ['SENTIDO ASDASDASDAl', 'sentido', 'ahhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhh'] as s}
				<li>
					<button class="opcao" onclick={mudarAtual.bind(null, s)}>
						{s}
					</button>
				</li>
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

	ul {
		background-color: white;
		list-style: none;

		inset-inline: 0;
		padding-bottom: 8px;
		padding-inline: 16px 8px;
		position: absolute;
	}

	button.opcao {
		/* display: block; */

		margin-bottom: 8px;
		min-width: 150px;

		padding-block: 12px;
		padding-inline: 16px;

		background-color: lightgray;
		box-shadow: -4px 4px green;

		border: none;
		border-radius: 16px;

		text-align: start;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	button.principal {
		display: grid;

		text-align: left;
		font-size: 100%;

		align-items: center;

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
