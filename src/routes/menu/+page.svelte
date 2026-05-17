<script lang="ts">
	import NavPaginas from '$lib/comps/NavPaginas.svelte';
	import PopUp from '$lib/comps/PopUp.svelte';
	import { storeIdioma } from '$lib/stores/storeIdioma';
	import { Languages, Moon, Paintbrush, Sun, SunMoon, type LucideIcon } from '@lucide/svelte';
</script>

<NavPaginas ativo="menu" />

{#snippet Opcao(nome: string, link: string, Icone: LucideIcon)}
	<li>
		<Icone />
		<span>{nome}</span>
	</li>
{/snippet}

<PopUp ativo={false} />

<main>
	<ul>
		<li>
			<Paintbrush />
			<a href="/menu/aparencia">{$storeIdioma.pag.menu.opcoes.aparencia}</a>
		</li>
		<li>
			<Languages />
			<a href="/menu/idioma">{$storeIdioma.pag.menu.opcoes.idioma}</a>
		</li>
	</ul>
</main>

<style>
	ul {
		display: grid;
		gap: 16px;
		padding: 0;
	}
	li {
		display: grid;
		gap: 18px;
		align-items: center;
		grid-template-columns: auto 1fr;
		background-color: var(--cor-fundo-alta);
		padding-block: 8px;
		padding-inline: 16px;
		border-radius: 8px;
	}
	a {
		text-decoration: none;
		color: var(--cor-texto);
		font-size: 1.5rem;
	}
</style>
