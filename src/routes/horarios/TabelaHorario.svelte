<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	const itens = Array(63).fill(0);
	let ativo = $state(null);

	const rolarAte: Attachment = (el) => {
		el.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};
</script>

<div>
	<ul>
		{#each itens as _, i}
			{#if i == 15}
				<li class="ativo" {@attach rolarAte}>11:23</li>
			{:else}
				<li>11:23</li>
			{/if}
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
		margin-top: 8px;

		list-style: none;
		padding-inline: 8px;

		grid-template-columns: 1fr;
		gap: 4px;

		@media (min-width: 700px) {
			grid-template-columns: repeat(6, 1fr);
			gap: 8px;
			margin-top: 16px;
		}
	}

	li {
		text-align: center;

		padding-block: 8px;

		background-color: var(--fundo-1, lightgrey);
		border-radius: 16px;

		color: var(--texto-base, black);
		&.ativo {
			background-color: var(--primaria, green);
			color: var(--texto-alt, white);
		}

		@media (min-width: 700px) {
			font-size: 1rem;
			min-width: 6rem;
		}
	}
</style>
