<script lang="ts">
	import BarraNavegacao from './BarraNavegacao.svelte';
	import { type OpcaoNavBar } from './BarraNavegacao.svelte';
	import { Heart, BusFront, Menu } from '@lucide/svelte';

	let { ativo }: { ativo: 'favoritos' | 'horarios' | 'menu' } = $props();

	const opcoes: OpcaoNavBar[] = $derived([
		{ rotulo: 'favoritos', caminho: '/favoritos', ativo: ativo == 'favoritos', icone: Heart },
		{ rotulo: 'horarios', caminho: '/', ativo: ativo == 'horarios', icone: BusFront },
		{ rotulo: 'menu', caminho: '/menu', ativo: ativo == 'menu', icone: Menu }
	]);
</script>

<BarraNavegacao {opcoes} />
