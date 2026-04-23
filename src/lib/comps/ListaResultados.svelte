<script lang="ts">
	import { type ItemLinha } from '$lib/linhas';

	let { resultados = [] }: { resultados: ItemLinha[] } = $props();
</script>

{#snippet Item(item: ItemLinha)}
	<li>
		<a href={item.caminho}>
			<span class="nome-empresa">{item.empresa}</span>
			<span class="nome-linha">
				{#if item.codigo}
					{`${item.codigo} | ${item.nome}`}
				{:else}
					{`${item.nome}`}
				{/if}
			</span>
		</a>
	</li>
{/snippet}

<ul class="resultados-pesquisa">
	{#each resultados as item}
		{@render Item(item)}
	{/each}
</ul>

<style>
	ul {
		display: flex;
		padding: 0;
		margin: 0;
		flex-direction: column;
		gap: 8px;
	}
	li {
		/* flex: 1; */
		flex-shrink: 0;
		list-style-type: none;
		border-radius: 16px;
		background-color: var(--cor-principal);
	}
	span {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 1.25rem;
	}
	span.nome-empresa {
		font-size: 0.75rem;
	}
	a {
		display: grid;
		padding-block: 12px;
		padding-inline: 16px;

		color: var(--cor-texto);
		text-decoration: none;
	}
</style>
