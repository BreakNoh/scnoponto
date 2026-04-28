<script lang="ts">
	import { type LucideIcon } from '@lucide/svelte';

	export type OpcaoNavBar = {
		caminho?: string;
		acao?: () => void;
		rotulo: string;
		icone?: LucideIcon;
		ativo?: boolean;
	};

	type PropsNavbar = {
		opcoes: OpcaoNavBar[];
		mesmaPagina?: boolean;
		fixa?: boolean;
	};

	let { opcoes, mesmaPagina = false, fixa = true }: PropsNavbar = $props();
</script>

<nav class:fixa>
	<div class="conteiner">
		{#each opcoes as { caminho, acao, rotulo, icone: Icone, ativo }}
			{#if caminho}
				<a href={caminho} class:ativo data-sveltekit-replacestate={mesmaPagina ? '' : undefined}>
					{#if Icone}
						<div class="wrapper-icone">
							<Icone />
						</div>
					{/if}
					<span>{rotulo}</span>
				</a>
			{:else if acao}
				<button onclick={acao} class:ativo>
					{#if Icone}
						<div class="wrapper-icone">
							<Icone />
						</div>
					{/if}
					<span>{rotulo}</span>
				</button>
			{/if}
		{/each}
	</div>
</nav>

<style>
	:global(body:has(nav.fixa)) {
		margin-bottom: 96px; /* respira pra navbar */
	}
	nav.fixa {
		position: fixed;

		left: 0;
		right: 0;
		bottom: 0;

		background-color: var(--cor-fundo-base);

		padding-inline: 16px;
		padding-top: 8px;
		padding-bottom: calc(env(safe-area-inset-bottom, 0) + 16px);
	}

	div.conteiner {
		display: flex;

		border-radius: 16px;
		background-color: var(--cor-fundo-alta);

		gap: 8px;
	}

	a,
	button {
		flex: 1;
		padding: 8px;
		display: flex;
		flex-direction: column;
		place-content: center;
		font-size: 1rem;

		text-align: center;
		color: var(--cor-texto);
		background-color: transparent;
		border-style: none;
		text-decoration: none;
	}

	.ativo {
		border-radius: 16px;
		background-color: var(--cor-principal);
		color: var(--cor-texto-alt);
	}
</style>
