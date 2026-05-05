import { cacheEmpresas } from '$lib/server/server_utils';
import Fuse from 'fuse.js';
import type { RequestHandler } from './$types';
import type { ItemPesquisa } from '$lib/tipos';
import { z } from 'zod';

let motor: Fuse<ItemPesquisa> | null = null;

const schemaPesquisa = z.object({
	termo: z.string().default(''),
	filtros: z
		.object({
			emp: z.array(z.string().refine((v) => v.toLowerCase().trim())).optional()
		})
		.optional()
});

async function iniciarMotorPesquisa() {
	if (motor) return;
	await cacheEmpresas.iniciar();
	motor = new Fuse<ItemPesquisa>(cacheEmpresas.itens(), {
		keys: ['nome_linha', 'codigo_linha', 'nome_empresa'],
		threshold: 0.4,
		isCaseSensitive: false
	});
}

async function pesquisar(pesquisa: z.infer<typeof schemaPesquisa>, limite: number = 8) {
	await iniciarMotorPesquisa();

	const filtrarEmpresa = (v: ItemPesquisa) => {
		return !pesquisa.filtros?.emp || pesquisa.filtros?.emp?.includes(v.nome_empresa);
	};

	return motor
		?.search(pesquisa.termo)
		.map((v) => v.item)
		.filter(filtrarEmpresa)
		.filter((_, i) => i < limite);
}

export const POST: RequestHandler = async ({ request }) => {
	const json = await request.json();
	const parseado = schemaPesquisa.safeParse(json);

	if (!parseado.success) return new Response('', { status: 400 });

	const pesquisa = parseado.data;
	return new Response(JSON.stringify(await pesquisar(pesquisa)));
};
