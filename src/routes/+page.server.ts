import { cacheEmpresas } from '$lib/server/cache';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	throw redirect(308, '/pesquisa');
	await cacheEmpresas.iniciar();
	return {
		empresas: cacheEmpresas.empresas()
	};
};
