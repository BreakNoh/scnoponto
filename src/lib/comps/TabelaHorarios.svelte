<script lang="ts">
	import type { Servico } from '$lib/tipos';
	import { ChevronRight, ChevronDown } from '@lucide/svelte/icons';

	let { servico }: { servico: Servico } = $props();
	let colapsado = $state(false);

	const auternar_colapsado = () => {
		colapsado = !colapsado;
	};
</script>

<section>
	<button onclick={auternar_colapsado}>
		<h3>
			{servico.sentido}
		</h3>

		{#if colapsado}
			<ChevronRight />
		{:else}
			<ChevronDown />
		{/if}
	</button>
	{#if !colapsado}
		<ul>
			{#each servico.horarios as horario}
				{@const tem_obs = horario.obs.length > 0}
				<li class={[{ tem_obs }]}>
					{horario.hora}
					{#if tem_obs}
						<span>A</span>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	section {
		width: 100%;
	}

	button {
		width: 100%;
		background-color: lightskyblue;
		border: none;
		border-radius: 16px;

		padding-inline: 32px;
		padding-block: 16px;

		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
	}

	h3 {
		font-size: 1.5rem;
		text-align: left;
		margin: 0;

		@media (min-width: 650px) {
			text-align: center;
		}
	}
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

	li.tem_obs {
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
