import { type Linha, type Dias, DIAS, type Servico } from '$lib/tipos';
import { readFile } from 'node:fs/promises';
import type { PageServerLoad } from './$types';
import { cacheEmpresas, CAMINHO_DADOS } from '$lib/server/cache';
import { error, redirect } from '@sveltejs/kit';
import { CODIGO_DIAS } from '$lib/utils';

async function carregarLinha(
	empresa: string,
	linha: string
): Promise<[Linha, string | undefined] | undefined> {
	try {
		const json = await readFile(`${CAMINHO_DADOS}/${empresa}/${linha}.json`, { encoding: 'utf-8' });
		const jsonEmpresa = await readFile(`${CAMINHO_DADOS}/${empresa}/_self.json`, {
			encoding: 'utf-8'
		});

		const linhaCarregada = JSON.parse(json) as Linha;
		linhaCarregada.servicos = new Map(
			Object.entries(linhaCarregada.servicos).map(([k, v]) => [Number(k), v as Servico[]])
		);

		return [linhaCarregada, JSON.parse(jsonEmpresa).nome];
	} catch {
		return undefined;
	}
}

function servicoDia(servicos: Map<Dias, Servico[]>, dia: Dias, idx: number) {
	for (const [d, serv] of servicos.entries()) {
		if (dia & d) {
			return [serv.at(idx), dia];
		}
	}
	return undefined;
}

export const load: PageServerLoad = async ({ params }) => {
	let dia = params.dia
		? (CODIGO_DIAS.entries()
				.find(([_, v]) => v == params.dia)
				?.at(0) as number)
		: undefined;

	if (!dia) {
		// se dia não for especificado usar o dia de hoje
		const hoje = new Date();
		switch (hoje.getDay()) {
			case 0:
				dia = DIAS.domingoFeriados;
				break;
			case 6:
				dia = DIAS.domingoFeriados;
				break;
			default:
				dia = DIAS.uteis;
				break;
		}
	}

	const dados = await carregarLinha(params.empresa, params.linha);

	if (!dados) {
		throw error(404, { message: 'linha não encontrada' });
	}

	const [linha, nomeEmpresa] = dados;

	const diasServicos = linha.servicos.keys().toArray();

	if (!diasServicos.includes(dia)) {
		dia = diasServicos.at(0);
	}

	let idxSentido = 0;

	if (params.sentido) {
		idxSentido = Number(params.sentido?.trim());
		const s = linha.servicos.has(dia ?? 0);

		if (isNaN(idxSentido) || !s) {
			throw redirect(308, `/horarios/${params.empresa}/${params.linha}/${dia}`);
		}
	}

	return {
		linha,
		nomeEmpresa,
		dia: dia!,
		idxSentido,
		itemPesquisa: nomeEmpresa ? cacheEmpresas.ler(nomeEmpresa, linha.nome, linha.codigo) : null
	};
};
