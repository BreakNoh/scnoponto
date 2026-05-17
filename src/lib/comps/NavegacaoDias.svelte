<script lang="ts">
	import { page } from '$app/state';
	import { CODIGO_DIAS } from '$lib/utils';
	import { type Linha, type Dias, DIAS } from '$lib/tipos';
	import BarraNavegacao, { type OpcaoNavBar } from './BarraNavegacao.svelte';
	import { storeIdioma } from '$lib/stores/storeIdioma';

	let { dias, ativo }: { dias: Dias[] | string[]; ativo?: Dias } = $props();

	// let dias = $derived(linha.servicos.keys().toArray());

	const NOMES_DISPLAY_LONGO = new Map([
		[DIAS.uteis, $storeIdioma.dia.uteis],
		[DIAS.sabado, $storeIdioma.dia.sabado],
		[DIAS.domingoFeriados, $storeIdioma.dia.domingo],
		[DIAS.sabado | DIAS.domingoFeriados, $storeIdioma.dia.findes],
		[127, $storeIdioma.dia.todoDia]
	]);

	let { empresa: slugEmp, linha: slugLin } = page.params;

	const arrumarBitsDias = (d: Dias): Dias => {
		return (d & DIAS.domingoFeriados) | ((d & DIAS.sabado) << 5) | ((d & DIAS.uteis) >> 1);
	};

	function gerarOpcoes(dias: Dias[] | string[]) {
		const opcoes: OpcaoNavBar[] = [];

		dias
			.filter((d) => NOMES_DISPLAY_LONGO.has(Number(d)))
			.sort((a, b) => arrumarBitsDias(Number(a)) - arrumarBitsDias(Number(b)))
			.forEach((d) => {
				opcoes.push({
					rotulo: NOMES_DISPLAY_LONGO.get(Number(d))!,
					ativo: !!((ativo ?? 0) & Number(d)),
					caminho: `/horarios/${slugEmp}/${slugLin}/${CODIGO_DIAS.get(Number(d)) ?? ''}`
				});
			});

		return opcoes;
	}

	const opcoes: OpcaoNavBar[] = $derived(gerarOpcoes(dias));
</script>

<BarraNavegacao {opcoes} mesmaPagina={true} fixa={false} />
