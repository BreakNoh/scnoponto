<script lang="ts">
	import type { Horario } from '$lib/tipos';
	import { horario_proximo } from '$lib/utils';
	import { Info } from '@lucide/svelte';
	import type { Attachment } from 'svelte/attachments';

	type Props = {
		horarios: Horario[];
		display?: 'inline' | 'tabela';
	};

	let { horarios = [], display = $bindable('tabela') }: Props = $props();

	const focarHorario: Attachment = (elem) => {
		elem.scrollIntoView({ inline: 'start' });
	};

	let proximoHorario = $derived(horario_proximo(horarios, new Date()));
</script>

<ul class={display}>
	{#each horarios as horario}
		{@const proximo = proximoHorario == horario}
		{@const tem_obs = !!horario.obs}

		<li class:proximo {@attach proximo && focarHorario}>
			{horario.hora}
			{#if tem_obs}
				<Info />
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		margin: 0;
		margin-top: 16px;
	}
	ul.tabela {
		display: grid;
		grid-template-columns: repeat(auto-fill, 5rem);
		justify-content: center;
		gap: 4px;
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

		column-gap: 4px;

		background-color: var(--cor-fundo-alta);
		border-radius: 8px;
	}

	li.proximo {
		background-color: var(--cor-principal);
		color: var(--cor-texto-alt);
		border: none;
		border-radius: 16px;
		scroll-margin-inline: 32px;
	}
</style>
