<script lang="ts">
	import Colapsavel from './Colapsavel.svelte';
	import { ExternalLink } from '@lucide/svelte';
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
		<h3>
			{servico.sentido}
		</h3>
		<span class="anterior">{horario_anterior(servico.horarios)}</span>
		<a href={`/linhas/${linha.id}#${servico.sentido}`} class="proximo">
			{proximo_horario(servico.horarios)}
		</a>
	</li>
{/snippet}

<a href={`/linhas/${linha.id}`}>
	<h2>{linha.nome}</h2>
	<ExternalLink />
</a>
<ul>
	{#each servicos as servico}
		{@render PreviewServico(servico)}
	{/each}
</ul>

<style>
	a {
		display: flex;
		align-items: center;
		justify-content: space-between;

		background-color: lightskyblue;
		border: none;
		border-radius: 16px;

		padding-inline: 32px;
		padding-block: 16px;

		text-decoration: none;
		color: black;
	}
	a.proximo {
		padding-inline: 16px;
		padding-block: 12px;
	}

	h2 {
		margin: 0;
	}
	h3 {
		margin: 0;
	}

	ul {
		display: flex;
		flex-direction: column;

		padding: 0;
		margin-block: 0.5rem 0;
		gap: 0.5rem;
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
</style>
