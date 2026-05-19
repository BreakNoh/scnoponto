<script lang="ts">
	import type { Servico } from '$lib/tipos';
	import { ChevronDown, ChevronRight } from '@lucide/svelte';

	type Props = { sentidos: Servico[]; atual: number };
	let { sentidos, atual = $bindable(0) }: Props = $props();
	let sentidoAutal = $derived(sentidos[atual]);
	let aberto = $state(false);
</script>

<section onblur={() => (aberto = false)}>
	<button onclick={() => (aberto = !aberto)} class="atual">
		<h2>{sentidoAutal.sentido}</h2>
		{#if aberto}
			<ChevronDown />
		{:else}
			<ChevronRight />
		{/if}
	</button>
	{#if aberto}
		<ul class="lista-suspensa">
			{#each sentidos as sentido, i}
				{#if atual != i}
					<li>
						<button
							onclick={() => {
								atual = i;
								aberto = false;
							}}
							>{sentido.sentido}
						</button>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</section>

<style>
	section {
		position: relative;
		margin-top: 16px;
	}
	button {
		width: 100%;
		padding: 16px;
		border: none;
		border-radius: 16px;
		/* overflow-x: hidden; */

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		background-color: var(--cor-fundo-media, blue);
	}
	button.atual {
		background-color: transparent;
		padding: 8px;
		display: grid;
		border-radius: 0;
		grid-template-columns: 1fr auto;
		border-bottom: 4px var(--cor-principal, blue) solid;
	}
	ul.lista-suspensa {
		position: absolute;
		inset-inline: 0;

		list-style: none;
		padding-inline: 8px;
		padding-bottom: 8px;
		margin-block: 8px 0;
		background-color: var(--cor-fundo-base);
	}
	li {
		display: block;

		& button {
			font-size: 1.25rem;
		}
	}
	h2 {
		font-size: 1.25rem;
		margin: 0;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}
</style>
