<script lang="ts">
	import { type LucideIcon } from '@lucide/svelte';

	export type OpcaoNavBar = {
		caminho: string;
		rotulo: string;
		icone?: LucideIcon;
		ativo?: boolean;
	};

	type PropsNavbar = {
		opcoes: OpcaoNavBar[];
		mesmaPagina?: boolean;
	};

	let { opcoes, mesmaPagina = false }: PropsNavbar = $props();
</script>

<nav>
	<div class="conteiner">
		{#each opcoes as { caminho, rotulo, icone: Icone, ativo }}
			<a href={caminho} class:ativo data-sveltekit-replacestate={mesmaPagina ? '' : undefined}>
				{#if Icone}
					<div class="wrapper-icone">
						<Icone />
					</div>
				{/if}
				<span>{rotulo}</span>
			</a>
		{/each}
		<!-- <a href="/favoritos" class:ativo={page.url.pathname.includes('/favoritos')}> -->
		<!-- 	<div class="wrapper-icone"> -->
		<!-- 		<Heart /> -->
		<!-- 	</div> -->
		<!-- 	<span>favoritos</span> -->
		<!-- </a> -->
		<!-- <a href="/" class:ativo={page.url.pathname.includes('/horarios') || page.url.pathname == '/'}> -->
		<!-- 	<div class="wrapper-icone"> -->
		<!-- 		<BusFront /> -->
		<!-- 	</div> -->
		<!-- 	<span>horários</span> -->
		<!-- </a> -->
		<!-- <a href="/menu" class:ativo={page.url.pathname.includes('/menu')}> -->
		<!-- 	<div class="wrapper-icone"> -->
		<!-- 		<Menu /> -->
		<!-- 	</div> -->
		<!-- 	<span>mais</span> -->
		<!-- </a> -->
	</div>
</nav>

<style>
	:global(body) {
		margin-bottom: 96px; /* respira pra navbar */
	}
	nav {
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
		min-height: 64px;
		/* padding-block: 4px; */
		/* padding-inline: 4px; */
		border-radius: 16px;
		background-color: var(--cor-fundo-alta);

		gap: 8px;
	}

	a {
		flex: 1;
		padding: 8px;
		display: flex;
		flex-direction: column;
		place-content: center;

		text-align: center;
		color: var(--cor-texto);
		text-decoration: none;
	}

	a span {
		@media (max-width: 300px) {
			display: none;
		}
	}

	a.ativo {
		border-radius: 16px;
		background-color: var(--cor-principal);
		color: var(--cor-texto-alt);
	}
</style>
