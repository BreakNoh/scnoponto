<script lang="ts">
	let { data } = $props();
	let favoritos = $derived(data.favoritos);
</script>

<main>
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

		background-color: lightskyblue;
	}
	span {
		font-size: 1rem;
	}
</style>
