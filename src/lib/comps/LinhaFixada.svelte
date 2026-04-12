<script lang="ts">
	import Colapsavel from './Colapsavel.svelte';
	import type { Linha, Dia, Servico, Horario } from '$lib/tipos';
	import { parse } from 'date-fns';

	let { linha, dia }: { linha: Linha; dia: Dia } = $props();
	let servicos = $derived(linha.servicos.get(dia) || []);

	function horario_anterior(horarios: Horario[]) {
		let ant = horarios.at(-1)?.hora;
		const agora = new Date();

		if (!ant) {
			return 'N/D';
		}

		ant =
			horarios.findLast((v) => {
				const hora = v.hora;
				const val_hora = parse(hora, 'HH:mm', agora);

				return val_hora <= agora;
			})?.hora || ant;

		return ant;
	}
	function proximo_horario(horarios: Horario[]) {
		let prox = horarios[0].hora;
		const agora = new Date();

		if (!prox) {
			return 'N/D';
		}
		prox =
			horarios.find((v) => {
				const hora = v.hora;
				const val_hora = parse(hora, 'HH:mm', agora);

				return val_hora >= agora;
			})?.hora || prox;

		return prox;
	}
</script>

{#snippet PreviewServico(servico: Servico)}
	<li>
		<h2>
			{servico.sentido}
		</h2>
		<span class="anterior">{horario_anterior(servico.horarios)}</span>
		<span class="proximo">{proximo_horario(servico.horarios)}</span>
	</li>
{/snippet}

<Colapsavel titulo={linha.nome}>
	<ul>
		{#each servicos as servico}
			{@render PreviewServico(servico)}
		{/each}
	</ul>
</Colapsavel>

<style>
	h2 {
		margin-block: 8px;
	}
	ul {
		padding: 0;
		margin-block: 0.5rem 0;
	}
	li {
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 8px;
		padding-inline: 1rem;

		list-style-type: none;
		justify-content: space-between;
		align-items: center;
	}
	span.proximo {
		background-color: lightskyblue;
		padding-inline: 16px;
		padding-block: 8px;

		border-radius: 16px;
	}
</style>
