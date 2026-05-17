<script lang="ts">
	import { browser } from '$app/environment';
	import BarraNavegacao from '$lib/comps/BarraNavegacao.svelte';
	import { storeIdioma } from '$lib/stores/storeIdioma';
	import { storeTema } from '$lib/stores/storeTema';
	import { CORES } from '$lib/temas';
	import { carregarLingaguem } from '$lib/utils';
	import { ChevronLeft, ChevronRight, Moon, Sun, SunMoon, type LucideIcon } from '@lucide/svelte';

	const mudarIdioma = async (idioma: string) => {
		$storeIdioma = await carregarLingaguem(idioma);

		if (!browser) return;

		localStorage.setItem('idioma', idioma);
	};
</script>

<a href="/menu" class="voltar"><ChevronLeft />{$storeIdioma.gen.voltar}</a>
<main>
	{#key $storeIdioma}
		<ul>
			{#each [['Português', 'pt'], ['English', 'en'], ['Español', 'es']] as [display, codigo]}
				<li>
					<button
						onclick={mudarIdioma.bind(null, codigo)}
						class:ativo={browser ? localStorage.getItem('idioma') == codigo : false}
						>{display}</button
					>
				</li>
			{/each}
		</ul>
	{/key}
</main>

<style>
	a.voltar {
		display: flex;
		margin-inline: 16px;
		margin-top: 16px;
		align-items: center;
		text-decoration: none;
		color: var(--cor-texto);
	}
	ul {
		display: grid;
		gap: 16px;
		padding: 0;
	}
	li {
		display: flex;
		gap: 18px;
		align-items: center;
		grid-template-columns: auto 1fr;
		/* background-color: var(--cor-fundo-alta); */
	}
	button {
		text-decoration: none;
		flex: 1;
		background-color: var(--cor-fundo-alta);
		color: var(--cor-texto);
		border: none;

		font-size: 1.5rem;
		padding-block: 8px;
		padding-inline: 16px;
		border-radius: 8px;

		&.ativo {
			background-color: var(--cor-principal);
			color: var(--cor-texto-alt);
		}
	}
</style>
