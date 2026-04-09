<script lang="ts">
	import type { Servico } from '$lib/tipos';
	let { servico }: { servico: Servico } = $props();
</script>

<section>
	<h3>{servico.sentido}</h3>
	<ul>
		{#each servico.horarios as horario}
			<li>{horario.hora}</li>
		{/each}
	</ul>
</section>

<style>
	ul {
		list-style: none;
		padding: 0;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 4px;
	}
	li {
		padding: 0.5rem;
		border: 1px solid black;
	}
</style>
