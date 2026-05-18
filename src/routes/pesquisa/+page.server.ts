import { carregarLinha } from '$lib/server/utils';
import { DIAS } from '$lib/tipos';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ url }) => {
	if (!url.searchParams.has('q')) return {};

	try {
		const [slugEmpresa, slugLinha] = url.searchParams.get('q')!.split(' ');

		const dia = (() => {
			switch (new Date().getDay()) {
				case 0:
					return DIAS.domingoFeriados;
				case 6:
					return DIAS.sabado;
				default:
					return DIAS.uteis;
			}
		})();

		const linha = await carregarLinha(slugEmpresa, slugLinha);
		// console.log(linha);

		return { linha, dia };
	} catch {
		return {};
	}
};
