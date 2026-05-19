<script lang="ts">
	import { page } from '$app/state';
	import { CODIGO_DIAS } from '$lib/utils';

	type Props = { dias: string[]; atual: string; slug: string };

	let { dias, atual, slug }: Props = $props();
	let { emp, lin } = $state(page.params);
</script>

<nav>
	{#each dias as dia}
		<a
			href={`/p/${slug}/${CODIGO_DIAS.get(parseInt(dia))}`}
			data-sveltekit-replacestate
			class:ativo={atual == dia}
		>
			{CODIGO_DIAS.get(parseInt(dia))}
		</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		gap: 8px;
		justify-content: center;
		margin-top: 16px;
		padding-inline: 15%;
	}
	a {
		flex: 1;
		min-width: 4rem;
		color: var(--cor-texto);
		text-decoration: none;
		text-align: center;
		padding-inline: 16px;
		padding-block: 8px;
		border-radius: 8px;

		border: 1px solid var(--cor-principal, grey);

		&.ativo {
			background-color: var(--cor-principal, grey);
			border-radius: 16px;
			border-bottom: 4px var(--cor-principal, grey) solid;
		}
	}
</style>
