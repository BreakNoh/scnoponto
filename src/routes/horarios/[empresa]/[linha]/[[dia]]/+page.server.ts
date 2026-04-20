import { LINHA_TESTE } from '$lib/linhas';
import type { Linha, Servico, Dia } from '$lib/tipos';
import type { PageServerLoad } from './$types';

function ehDia(v: string | undefined): boolean {
	if (!v) return false;

	return ['dias-uteis', 'sabado', 'domingo-feriados'].includes(v);
}

export const load: PageServerLoad = ({ params }): { linha: Linha; dia: Dia } => {
	let dia: Dia = ehDia(params.dia) ? (params.dia as Dia) : 'dias-uteis';

	return {
		linha: {
			detalhe:
				'via r. fulano de tal ajdalshdjkahdk hajshdakjhda kjhsdkja hsdk ahsdk ajsdkla hsdkaj sd akdjalkdjal asldj aldj aljd aldj alkdj alskdj lk',
			...LINHA_TESTE
		},
		dia
	};
};
