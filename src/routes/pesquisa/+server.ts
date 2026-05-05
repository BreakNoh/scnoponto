import { cacheEmpresas } from '$lib/server/server_utils';
import Fuse from 'fuse.js';
import type { RequestHandler } from './$types';
import type { ItemPesquisa } from '$lib/tipos';

let motor: Fuse<ItemPesquisa> | null = null;

export const GET: RequestHandler = async ({ url }) => {
	const LIMITE_RESULTADOS = 8;
	if (!motor) {
		await cacheEmpresas.iniciar();
		motor = new Fuse<ItemPesquisa>(cacheEmpresas.itens(), {
			keys: ['nome_linha', 'codigo_linha', 'nome_empresa'],
			threshold: 0.4,
			isCaseSensitive: false
		});
	}

	const query = url.searchParams.get('q');
	const filtroEmpresas = url.searchParams.get('fe')?.toLowerCase() ?? '';

	const resultado = motor
		.search(query ?? '')
		.map((v) => v.item)
		.filter(
			({ nome_empresa }) =>
				filtroEmpresas.includes(encodeURI(nome_empresa.toLowerCase())) || filtroEmpresas == 'geral'
		)
		.filter((_, i) => i < LIMITE_RESULTADOS);

	return new Response(JSON.stringify(resultado));
};
