<script lang="ts">
	import { page } from '$app/state';
	import { CODIGO_DIAS } from '$lib/utils';
	import { type Linha, type Dias, DIAS } from '$lib/tipos';
	import BarraNavegacao, { type OpcaoNavBar } from './BarraNavegacao.svelte';

	let { linha, ativo }: { linha: Linha; ativo?: Dias } = $props();

	let dias = $derived(linha.servicos.keys().toArray());

	const NOMES_DISPLAY_LONGO = new Map([
		[DIAS.uteis, 'Dias Úteis'],
		[DIAS.sabado, 'Sábados'],
		[DIAS.domingoFeriados, 'Domingos'],
		[DIAS.sabado | DIAS.domingoFeriados, 'Finais de Semana'],
		[127, 'Diariamente']
	]);

	let { empresa: slugEmp, linha: slugLin } = page.params;

	const arrumarBitsDias = (d: Dias): Dias => {
		return (d & DIAS.domingoFeriados) | ((d & DIAS.sabado) << 5) | ((d & DIAS.uteis) >> 1);
	};

	function gerarOpcoes(dias: Dias[]) {
		const opcoes: OpcaoNavBar[] = [];

		dias
			.filter((d) => NOMES_DISPLAY_LONGO.has(d))
			.sort((a, b) => arrumarBitsDias(a) - arrumarBitsDias(b))
			.forEach((d) => {
				opcoes.push({
					rotulo: NOMES_DISPLAY_LONGO.get(d)!,
					ativo: !!((ativo ?? 0) & d),
					caminho: `/horarios/${slugEmp}/${slugLin}/${CODIGO_DIAS.get(d) ?? ''}`
				});
			});

		return opcoes;
	}

	const opcoes: OpcaoNavBar[] = $derived(gerarOpcoes(dias));
</script>

<BarraNavegacao {opcoes} mesmaPagina={true} fixa={false} />
