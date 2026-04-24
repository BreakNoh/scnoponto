import { gerarLinhaMock } from '$lib/linhas';
import type { Linha, Servico, Dia } from '$lib/tipos';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({
	params
}): { linha: Linha; dia: Dia; idxSentido: number } => {
	const CODIGO_DIAS = new Map<string, Dia>([
		['util', 'dias-uteis'],
		['sab', 'sabado'],
		['dom', 'domingo-feriados']
	]);

	let dia: Dia;
	if (params.dia) {
		dia = CODIGO_DIAS.get(params.dia) ?? 'dias-uteis';
	} else {
		// se dia não for especificado usar o dia de hoje
		const hoje = new Date();
		switch (hoje.getDay()) {
			case 0:
				dia = 'domingo-feriados';
				break;
			case 6:
				dia = 'sabado';
				break;
			default:
				dia = 'dias-uteis';
				break;
		}
	}
	const linha = gerarLinhaMock();

	let idxSentido = Number(params.sentido);

	if (isNaN(idxSentido) || !linha.servicos.get(dia)?.at(idxSentido)) {
		idxSentido = 0;
	}

	return {
		linha: {
			detalhe:
				'via r. fulano de tal ajdalshdjkahdk hajshdakjhda kjhsdkja hsdk ahsdk ajsdkla hsdkaj sd akdjalkdjal asldj aldj aljd aldj alkdj alskdj lk',
			...linha
		},
		dia,
		idxSentido
	};
};
