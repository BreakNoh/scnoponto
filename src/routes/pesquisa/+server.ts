import { cacheEmpresas, CAMINHO_DADOS } from '$lib/server/server_utils';
import Fuse from 'fuse.js';
import type { RequestHandler } from './$types';
import { glob, readFile } from 'node:fs/promises';
import type { ItemPesquisa } from '$lib/tipos';

async function carregarItensPesquisa() {
	if (cacheEmpresas.iniciado) {
		return cacheEmpresas.empresas
			.values()
			.flatMap((v) => v)
			.toArray();
	}

	let itens: ItemPesquisa[] = [];

	for await (const arq of glob(`${CAMINHO_DADOS}/**/_self.json`)) {
		const json = await readFile(arq, { encoding: 'utf-8' });
		const dados = JSON.parse(json);

		if (!dados.linhas) continue;
		const itensEmpresa = dados.linhas as ItemPesquisa[];

		itensEmpresa.forEach((v) => itens.push(v));

		if (!dados.nome) continue;
		cacheEmpresas.inserir(dados.nome, itensEmpresa);
	}

	return itens;
}

let motor: Fuse<ItemPesquisa> | null = null;

export const GET: RequestHandler = async ({ url }) => {
	const LIMITE_RESULTADOS = 8;
	if (!motor) {
		motor = new Fuse<ItemPesquisa>(await carregarItensPesquisa(), {
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
				filtroEmpresas.includes(encodeURI(nome_empresa.toLowerCase())) || filtroEmpresas == ''
		)
		.filter((_, i) => i < LIMITE_RESULTADOS);

	return new Response(JSON.stringify(resultado));
};
