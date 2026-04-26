<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { ChevronRight, ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	let {
		children,
		titulo = '',
		flutua = false,
		colapsado = $bindable(false)
	}: {
		children?: Snippet;
		titulo: string;
		flutua?: boolean;
		colapsado?: boolean;
	} = $props();
	const alternar_colapsado = () => {
		colapsado = !colapsado;
	};

	onNavigate(() => {
		colapsado = false;
	});
</script>

<div class="conteiner">
	<button onclick={alternar_colapsado}>
		<h3>
			{titulo.replace(/sa(i|í)da(s)?\s+(d(a|o)\s+)?/gi, '')}
		</h3>

		{#if !colapsado}
			<ChevronRight />
		{:else}
			<ChevronDown />
		{/if}
	</button>
	{#if colapsado && children}
		<div class="conteudo" class:flutua>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	div.conteiner {
		width: 100%;
		position: relative;
	}
	div.flutua {
		position: absolute;
	}
	div.conteudo {
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

		color: var(--cor-texto-alt);
	}

	h3 {
		font-size: 1.5rem;
		text-align: left;
		margin: 0;

		@media (min-width: 650px) {
			text-align: center;
		}

		color: var(--cor-texto-alt);

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
