<script lang="ts">
	import type { Linha, Dia } from '$lib/tipos';
	import BarraNavegacao, { type OpcaoNavBar } from './BarraNavegacao.svelte';

	let { linha, ativo }: { linha: Linha; ativo?: Dia } = $props();

	let dias = $derived.by(() => linha.servicos.keys());

	const NOMES_DISPLAY_LONGO = new Map([
		['dias-uteis', 'Dias Úteis'],
		['sabado', 'Sábados'],
		['domingo-feriados', 'Domingos']
	]);
	const NOMES_DISPLAY_CURTO = new Map([
		['dias-uteis', 'Úteis'],
		['sabado', 'Sáb'],
		['domingo-feriados', 'Dom']
	]);

	const opcoes: OpcaoNavBar[] = $derived(
		dias
			?.map((v) => ({
				rotulo: NOMES_DISPLAY_LONGO.get(v) ?? '',
				caminho: `${linha.endpoint}/${v}`,
				ativo: ativo == v
			}))
			.toArray()
	);
</script>

<BarraNavegacao {opcoes} mesmaPagina={true} fixa={false} />
