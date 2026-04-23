<script lang="ts">
	import { ChevronRight, ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	let {
		children,
		titulo = ''
	}: {
		children?: Snippet;
		titulo: string;
	} = $props();
	let colapsado = $state(true);
	const alternar_colapsado = () => {
		colapsado = !colapsado;
	};
</script>

<section>
	<button onclick={alternar_colapsado}>
		<h3>
			{titulo}
		</h3>

		{#if !colapsado}
			<ChevronRight />
		{:else}
			<ChevronDown />
		{/if}
	</button>
	{#if colapsado && children}
		{@render children()}
	{/if}
</section>

<style>
	section {
		width: 100%;
	}

	button {
		width: 100%;
		background-color: var(--cor-principal);
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
</style>
