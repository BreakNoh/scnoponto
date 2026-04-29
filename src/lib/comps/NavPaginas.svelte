<script lang="ts">
	import { storeIdioma } from '$lib/stores/storeIdioma';
	import BarraNavegacao from './BarraNavegacao.svelte';
	import { type OpcaoNavBar } from './BarraNavegacao.svelte';
	import { Heart, BusFront, Menu } from '@lucide/svelte';

	let { ativo }: { ativo: 'favoritos' | 'horarios' | 'menu' } = $props();

	const opcoes: OpcaoNavBar[] = $derived([
		{
			rotulo: $storeIdioma.pagina.favorito,
			caminho: '/favoritos',
			ativo: ativo == 'favoritos',
			icone: Heart
		},
		{
			rotulo: $storeIdioma.pagina.pesquisa,
			caminho: '/',
			ativo: ativo == 'horarios',
			icone: BusFront
		},
		{ rotulo: $storeIdioma.pagina.menu, caminho: '/menu', ativo: ativo == 'menu', icone: Menu }
	]);
</script>

<BarraNavegacao {opcoes} />
