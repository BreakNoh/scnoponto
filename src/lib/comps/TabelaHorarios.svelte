<script lang="ts">
	import type { Servico } from '$lib/tipos';
	import { horario_proximo } from '$lib/utils';
	import Colapsavel from './Colapsavel.svelte';

	let { servico, agora = new Date() }: { servico: Servico; agora: Date } = $props();
</script>

<Colapsavel titulo={servico.sentido || ''}>
	<ul>
		{#each servico.horarios as horario}
			{@const tem_obs = (horario.obs?.length || 0) > 0}
			<li class:proximo={horario_proximo(servico.horarios, agora) == horario}>
				{horario.hora}
				{#if tem_obs}
					<span>A</span>
				{/if}
			</li>
		{/each}
	</ul>
</Colapsavel>

<style>
	ul {
		list-style: none;
		padding: 0;

		display: grid;
		grid-template-columns: repeat(auto-fill, 5rem);
		justify-content: center;
		gap: 8px;
	}

	li {
		display: flex;
		padding-block: 12px;
		justify-content: center;
		column-gap: 0.5rem;
		width: 5rem;

		/* border: 1px solid black; */
		background-color: lightgrey;
		border-radius: 8px 8px 8px 8px;
	}

	li.proximo {
		background-color: lightskyblue;
		border: none;
		border-radius: 16px;
	}

	/* li:first-child { */
	/* 	border-top-left-radius: 16px; */
	/* 	border-bottom-left-radius: 16px; */
	/* } */
	/* li:last-child { */
	/* 	border-top-right-radius: 16px; */
	/* 	border-bottom-right-radius: 16px; */
	/* } */
</style>
