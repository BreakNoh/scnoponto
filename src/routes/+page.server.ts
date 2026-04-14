import { LINHA_TESTE } from '$lib/linhas';
import type { Linha, Servico, Dia } from '$lib/tipos';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (): { fixados: Linha[]; dia: Dia } => {
	return {
		fixados: [LINHA_TESTE, LINHA_TESTE, LINHA_TESTE],
		dia: 'dias-uteis'
	};
};
