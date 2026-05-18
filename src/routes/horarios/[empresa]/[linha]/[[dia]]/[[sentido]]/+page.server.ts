import { type Linha, type Dias, DIAS, type Servico } from '$lib/tipos';
import type { EntryGenerator, PageServerLoad, RouteParams } from './$types';
import { cacheEmpresas, dadosEmpresa, dadosLinhas } from '$lib/server/cache';
import { error, redirect } from '@sveltejs/kit';
import { CODIGO_DIAS } from '$lib/utils';
import { carregarLinha } from '$lib/server/utils';

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

	const linha = await carregarLinha(params.empresa, params.linha);
	// console.log(dados);

	if (!linha) {
		throw error(404, { message: 'linha não encontrada' });
	}

	let idxSentido = 0;

	if (!linha.servicos[dia]) {
		dia = DIAS.uteis;
	}

	if (params.sentido) {
		idxSentido = Number(params.sentido?.trim());

		const s = linha.servicos[dia];

		if (isNaN(idxSentido) || !s) {
			throw redirect(308, `/horarios/${params.empresa}/${params.linha}/${dia}`);
		}
	}

	return {
		linha,
		dia: dia!,
		idxSentido,

		itemPesquisa: linha.empresa ? cacheEmpresas.ler(linha.empresa, linha.nome, linha.codigo) : null
	};
};
