<script lang="ts">
	import type { Servico } from '$lib/tipos';
	let { servico }: { servico: Servico } = $props();
</script>

<section>
	<h3>{servico.sentido}</h3>
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
</section>

<style>
	ul {
		list-style: none;
		padding: 0;

		display: grid;
		grid-template-columns: repeat(auto-fill, 5rem);
		justify-content: center;
		gap: 4px;
	}

	li {
		display: flex;
		padding-block: 12px;
		justify-content: center;
		column-gap: 0.5rem;

		/* border: 1px solid black; */
		background-color: lightgrey;
		border-radius: 8px 8px 8px 8px;
	}

	li.tem_obs {
		background-color: lightskyblue;
		border: none;
		border-radius: 16px;
	}

	li:first-child {
		border-top-left-radius: 16px;
		border-bottom-left-radius: 16px;
	}
	li:last-child {
		border-top-right-radius: 16px;
		border-bottom-right-radius: 16px;
	}
</style>
