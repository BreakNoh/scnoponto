import { cacheEmpresas } from '$lib/server/cache';
import Fuse from 'fuse.js';
import type { ItemPesquisa } from '$lib/tipos';
import { z } from 'zod';
import { schemaFiltro } from '$lib/stores/storeFiltros';

let motor: Fuse<ItemPesquisa> | null = null;

export const schemaPesquisa = z.object({
	termo: z.string().default(''),
	filtros: schemaFiltro.optional()
});

async function prepararItens() {}

async function iniciarMotorPesquisa() {
	if (motor) return;

	await cacheEmpresas.iniciar();

	motor = new Fuse<ItemPesquisa>(cacheEmpresas.itens(), {
		keys: ['nome_linha', 'codigo_linha', 'nome_empresa'],
		threshold: 0.4,
		isCaseSensitive: false
	});
}

export default async function pesquisar(
	pesquisa: z.infer<typeof schemaPesquisa>,
	limite: number = 8
) {
	await iniciarMotorPesquisa();

	const filtrarEmpresa = (v: ItemPesquisa) => {
		return !pesquisa.filtros?.emp || pesquisa.filtros.emp?.includes(v.nome_empresa.trim());
		// return !pesquisa.filtros?.emp || pesquisa.filtros?.emp?.includes(v.nome_empresa);
	};

	return motor
		?.search(pesquisa.termo)
		.map((v) => v.item)
		.filter(filtrarEmpresa)
		.filter((_, i) => i < limite);
}
