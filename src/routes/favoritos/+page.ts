import { LINHA_TESTE } from '$lib/linhas';
import type { Linha } from '$lib/tipos';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		favoritos: [LINHA_TESTE, LINHA_TESTE] satisfies Linha[]
	};
};
