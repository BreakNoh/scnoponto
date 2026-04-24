<script lang="ts">
	import Colapsavel from '$lib/comps/Colapsavel.svelte';
	import NavPaginas from '$lib/comps/NavPaginas.svelte';
	import { storeTema } from '$lib/stores/storeTema';
	import {
		Globe,
		Languages,
		Lightbulb,
		Moon,
		Paintbrush,
		Sun,
		type LucideIcon
	} from '@lucide/svelte';
</script>

<NavPaginas ativo="menu" />

{#snippet Opcao(nome: string, link: string, Icone: LucideIcon)}
	<li>
		<Icone />
		<span>{nome}</span>
	</li>
{/snippet}

<main>
	<ul>
		<li>
			asdasd
			<Colapsavel titulo="">a</Colapsavel>
		</li>
	</ul>
</main>

<style>
	li {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
	}
</style>
