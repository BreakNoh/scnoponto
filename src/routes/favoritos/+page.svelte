<script lang="ts">
	import { HeartCrack } from '@lucide/svelte';

	let { data } = $props();
	let favoritos = $derived(data.favoritos);
</script>

<main>
	{#if favoritos.length == 0}
		<div class="sem-itens">
			<HeartCrack size="128px" />
			<p>nenhuma linha favorita</p>
		</div>
	{:else}
		<ul>
			{#each favoritos as { endpoint, codigo, nome, empresa }}
				<li>
					<a href={endpoint + '?v=fav'}>
						{codigo ? codigo + '|' : ''}{nome}
						<span>{empresa}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	main {
		padding: 16px;
	}
	ul {
		display: grid;

		margin: 0;
		padding: 0;
		list-style: none;
		gap: 8px;
	}
	li {
		display: flex;
	}
	a {
		color: black;
		text-decoration: none;

		font-size: 1.5rem;
		display: grid;
		width: 100%;
		border-radius: 16px;
		padding: 16px;

		background-color: var(--cor-principal);
	}
	span {
		font-size: 1rem;
	}
	div.sem-itens {
		position: absolute;
		text-align: center;
		top: 20%;
		left: 0;
		right: 0;
		color: var(--cor-fundo-media);
	}
</style>
