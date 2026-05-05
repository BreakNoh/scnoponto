<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { X } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	let { children }: { children: any } = $props();
</script>

{#if page.state.mostrarGaveta}
	<div class="gaveta" transition:fly={{ y: '25vh' }}>
		<div class="acoes">
			<button class="fechar" onclick={() => (browser ? history.back() : null)}
				><X size="36px" /></button
			>
		</div>
		<div class="conteudo">
			{@render children()}
		</div>
	</div>
{/if}

<style>
	div.gaveta {
		position: fixed;
		display: grid;

		z-index: 1;
		bottom: 0;
		inset-inline: 0;
	}
	div.conteudo {
		background-color: var(--cor-fundo-alta);

		padding-inline: 16px;
		padding-bottom: 8px;

		min-height: 25vh;

		border-radius: 8px 8px 0 0;
	}
	div.acoes {
		display: flex;
		justify-content: end;
		margin-bottom: 8px;
		margin-inline: 8px;
	}
	button.fechar {
		display: grid;
		place-content: center;

		aspect-ratio: 1 / 1;

		border-radius: 50%;
		border-style: none;

		padding: 8px;
	}
</style>
