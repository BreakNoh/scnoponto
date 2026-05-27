<script lang="ts">
	import type { Servico } from '$lib/tipos';
	import { horarioProximo, ordenarHorarios } from '$lib/utils';

	type Props = { servico: Servico; omitirSentido?: boolean };

	let { servico, omitirSentido }: Props = $props();
	let proximoHorario = $derived(horarioProximo(servico.horarios));
</script>

<section>
	{#if !omitirSentido}
		<h3>
			{servico.sentido}
		</h3>
	{/if}

	<ul>
		{#each ordenarHorarios(servico.horarios) as horario}
			<li class:proximo={horario == proximoHorario}>
				{horario.hora}
			</li>
		{/each}
	</ul>
</section>

<style>
	section {
		@media (min-width: 650px) {
			background-color: var(--cor-fundo-alta);
			text-align: center;
			padding-inline: 32px;
			padding-block: 16px 32px;
			margin-top: 16px;
			border-radius: 16px;
		}
	}

	ul {
		display: grid;

		grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
		padding-inline: 16px;

		@media (min-width: 650px) {
			grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
			padding-inline: 15%;

			max-width: 750px;
		}

		justify-content: center;
		gap: 8px;
		list-style: none;
		margin: 0;
		margin-top: 16px;
	}
	li {
		text-align: center;
		background-color: var(--cor-fundo-alta, grey);
		padding-inline: 16px;
		padding-block: 12px;
		border-radius: 8px;

		&.proximo {
			background-color: var(--cor-principal, blue);
			border-radius: 16px;
		}
	}
	h3 {
		border-bottom: 4px var(--cor-principal, blue) solid;
		padding-bottom: 8px;
	}
</style>
