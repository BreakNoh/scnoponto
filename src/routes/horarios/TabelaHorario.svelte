<script lang="ts">
	const itens = Array(63).fill(0);
	const numColunas = Math.ceil(Math.sqrt(itens.length));
</script>

<div>
	<ul>
		{#each itens as _, i}
			<li class:ativo={i == 15}>11:23</li>
		{/each}
	</ul>
</div>

<style>
	div {
		@media (min-width: 700px) {
			display: grid;
			justify-content: center;
		}
	}

	ul {
		display: grid;

		max-width: 700px;
		list-style: none;
		padding-inline: 16px;

		grid-template-columns: 1fr;
		gap: 8px;

		@media (min-width: 700px) {
			grid-template-columns: repeat(6, 1fr);
		}
	}

	li {
		text-align: center;

		/* padding: min(1rem, 8px); */
		padding-block: 16px;

		font-size: 1.25rem;

		background-color: lightgray;
		border-radius: 16px;

		&.ativo {
			background-color: green;
			color: white;
			/* border: 2px solid green; */
			/* box-shadow: 0 4px green; */
		}

		@media (min-width: 700px) {
			padding-block: 8px;
			font-size: 1rem;
			min-width: 6rem;
		}
	}
</style>
