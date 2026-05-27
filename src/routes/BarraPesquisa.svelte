<script lang="ts">
	import { XIcon, SearchIcon } from '@lucide/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type PropsBarraPesquisa = { valor?: string } & Omit<HTMLInputAttributes, 'value'>;

	let { valor = $bindable(''), ...propsInput }: PropsBarraPesquisa = $props();

	const limparValor = () => (valor = '');
</script>

<div class="caixa-pesquisa">
	<div class="icone lupa">
		<SearchIcon />
	</div>

	<input type="text" bind:value={valor} {...propsInput} />

	{#if valor.length > 0}
		<div class="icone limpar">
			<button onclick={limparValor}>
				<XIcon />
			</button>
		</div>
	{/if}
</div>

{JSON.stringify(propsInput)}

<style>
	div.caixa-pesquisa {
		--tamanho-icone: 24px;
		--margem-lateral: 16px;

		position: relative;
		display: flex;

		justify-content: space-between;
		align-content: center;

		padding-inline: var(--margem-lateral);
		padding-block: calc(var(--margem-lateral) / 1.5);
	}

	input {
		position: absolute;
		inset: 0;

		min-width: 0;

		line-height: 1rem;
		font-size: 1rem;

		padding-inline: calc(var(--margem-lateral) * 1.5 + var(--tamanho-icone));

		border: none;
		outline: none;
		border-radius: 16px;
	}

	button {
		padding: 0;
		margin: 0;
		border: none;
		background-color: transparent;
		display: grid;
	}

	div.icone {
		display: grid;
		place-content: center;

		z-index: 2;

		&.lupa {
			pointer-events: none;
		}
	}
</style>
