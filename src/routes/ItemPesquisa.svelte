<script lang="ts">
	import type { Snippet } from 'svelte';

	type PropsItemPesquisa = {
		children?: Snippet;
		codigo?: string;
		linha: string;
		empresa: string;
		url: string;
	};

	let { children, codigo, linha, empresa, url }: PropsItemPesquisa = $props();
</script>

<li>
	<a href={url}>
		<span class="linha">
			{#if codigo}
				<span class="codigo">{codigo}</span>
			{/if}
			{linha}
		</span>
		<span class="empresa">{empresa}</span>
	</a>

	{#if children}
		{@render children()}
	{/if}
</li>

<style>
	li {
		/* display: grid; */
		display: flex;
		list-style: none;

		max-width: min(30rem, 400px);
	}

	a {
		min-width: 15rem;

		background-color: lightgray;
		border-radius: 16px;

		padding-inline: 16px;
		padding-block: 8px;

		gap: 8px;

		box-shadow: -4px 8px green;
		text-decoration: none;
	}

	span.linha {
		font-size: 1rem;
	}

	span.codigo {
		background-color: green;
		color: white;

		font-weight: bold;
		font-size: 1rem;

		padding-block: 2px;
		padding-inline: 4px;

		border-radius: 8px;
		/* border: 4px solid green; */

		text-align: center;
	}

	span.empresa {
		display: block;
		font-size: 0.9rem;
	}
</style>
