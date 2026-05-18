import type { PageServerLoad } from './$types';
import { cacheEmpresas } from '$lib/server/cache';
import { error } from '@sveltejs/kit';
import { carregarLinha } from '$lib/server/utils';

export const load: PageServerLoad = async ({ params }) => {
	const { emp, lin, dia } = params;

	const linha = await carregarLinha(emp, lin);

	if (!linha) {
		throw error(404, { message: 'linha não encontrada' });
	}

	return {
		linha,
		dia: Number(dia) ?? 0,

		itemPesquisa: linha.empresa ? cacheEmpresas.ler(linha.empresa, linha.nome, linha.codigo) : null
	};
};
