<script lang="ts">
	import { XIcon, SearchIcon, setLucideProps } from '@lucide/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type PropsBarraPesquisa = { valor?: string } & Omit<HTMLInputAttributes, 'value'>;

	let { valor = $bindable(''), ...propsInput }: PropsBarraPesquisa = $props();

	const limparValor = () => (valor = '');
</script>

<div class="caixa-pesquisa">
	<div class="icone lupa">
		<SearchIcon size="var(--tamanho-icone)" />
	</div>

	<input type="text" bind:value={valor} {...propsInput} />

	{#if valor.length > 0}
		<div class="icone limpar">
			<button onclick={limparValor}>
				<XIcon size="var(--tamanho-icone)" />
			</button>
		</div>
	{/if}
</div>

<style>
	div.caixa-pesquisa {
		--tamanho-icone: 24px;
		--margem-lateral: 16px;
		--tamanho-fonte: 1.5rem;
		--fator-pad: 1;

		@media (min-width: 700px) {
			--tamanho-fonte: 2rem;
			--tamanho-icone: 32px;
			--margem-lateral: 24px;
			--fator-pad: 1.5;
		}

		padding-inline: var(--margem-lateral);
		padding-block: calc(var(--margem-lateral) / var(--fator-pad));

		position: relative;
		display: flex;

		justify-content: space-between;
		align-content: center;

		height: var(--tamanho-fonte);
	}

	input {
		position: absolute;
		inset: 0;

		min-width: 0;

		font-size: var(--tamanho-fonte);

		padding-inline: calc(var(--margem-lateral) * 1.5 + var(--tamanho-icone));

		border: 4px solid green;
		outline: none;
		border-radius: 32px;

		/* &:focus { */
		/* 	box-shadow: 0 8px green; */
		/* } */
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
