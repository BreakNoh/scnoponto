import { cacheEmpresas } from '$lib/server/server_utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	await cacheEmpresas.iniciar();
	return {
		empresas: cacheEmpresas.empresas()
	};
};
