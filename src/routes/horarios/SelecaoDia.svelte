<script lang="ts">
	let ativo = $state(0);
</script>

<ul>
	{#each ['dias úteis', 'sábados', 'domingos e feriados'] as d, i}
		<li>
			<button class:ativo={i == ativo} onclick={() => (ativo = i)}>{d}</button>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		padding: 0;
		justify-content: center;
		list-style: none;
		gap: 8px;
	}

	li {
		margin-block: 4px 0;

		&:has(button.ativo) {
			margin-block: 0 4px;
		}
	}

	li button {
		border: none;
		background-color: var(--fundo-base, white);
		border-radius: 16px;

		padding-inline: 16px;
		padding-block: 8px;
		border: 2px solid var(--fundo-1, lightgrey);

		&.ativo {
			box-shadow: 0 4px var(--primaria, green);
			border-color: var(--primaria, green);
		}
	}
</style>
