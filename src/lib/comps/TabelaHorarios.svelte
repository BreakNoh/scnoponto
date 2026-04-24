<script lang="ts">
	import type { Horario } from '$lib/tipos';
	import { horarioProximo, ordenarHorarios } from '$lib/utils';
	import { Info } from '@lucide/svelte';
	import type { Attachment } from 'svelte/attachments';

	type Props = {
		horarios: Horario[];
		sentido?: string;
		display?: 'inline' | 'grade' | 'linha';
	};

	let { horarios = [], display = $bindable('grade'), sentido }: Props = $props();
	let horariosOrdenados = $derived(ordenarHorarios(horarios));

	const focarHorario: Attachment = (elem) => {
		elem.scrollIntoView({ inline: 'start', block: 'center' });
	};

	let proximoHorario = $derived(horarioProximo(horarios));
</script>

<ul class={display}>
	{#each horariosOrdenados as horario}
		{@const proximo = proximoHorario == horario}
		{@const tem_obs = !!horario?.obs}

		<li class:proximo {@attach proximo && focarHorario}>
			<span class="hora">
				{horario.hora}
				{#if tem_obs}
					<Info />
				{/if}
			</span>
			{#if display == 'linha'}
				<span class="sentido">{`| ${sentido}`}</span>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		margin: 0;
		/* margin-top: 8px; */
	}
	ul.linha {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-inline: 16px;
		gap: 8px;
	}
	ul.grade {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
		justify-content: center;
		padding-inline: 16px;

		gap: 8px;
	}
	ul.inline {
		display: flex;
		padding-bottom: 8px;
		padding-inline: 16px;
		overflow-x: scroll;
		gap: 8px;
	}

	li {
		list-style-type: none;

		display: flex;

		flex: 1;

		padding-block: 12px;
		padding-inline: 8px;

		min-width: 4rem;

		justify-content: center;
		align-items: center;

		background-color: var(--cor-fundo-alta);
		border-radius: 8px;
	}
	ul.linha li {
		justify-content: start;
		gap: 8px;
		padding-inline: 24px;

		& span.hora {
			font-weight: bolder;
		}
	}
	li span {
		display: flex;
		column-gap: 4px;

		justify-content: center;
		align-items: center;
	}

	li.proximo {
		background-color: var(--cor-principal);
		color: var(--cor-texto-alt);

		border: none;
		border-radius: 16px;
		scroll-margin-inline: 32px;
	}
</style>
