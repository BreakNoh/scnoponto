import { type Linha, type Dias, DIAS, type Servico } from '$lib/tipos';
import type { EntryGenerator, PageServerLoad, RouteParams } from './$types';
import { cacheEmpresas, dadosEmpresa, dadosLinhas } from '$lib/server/cache';
import { error, redirect } from '@sveltejs/kit';
import { CODIGO_DIAS } from '$lib/utils';

async function carregarLinha(empresa: string, linha: string): Promise<[Linha, string] | undefined> {
	try {
		const nomeEmpresa =
			(
				Object.entries(dadosEmpresa)
					.find(([k, _]) => k.includes(`/${empresa}/`))
					?.at(1) as { default: { nome: string } } | undefined
			)?.default.nome ?? 'empresa';

		const loader = Object.entries(dadosLinhas).find(([caminho]) =>
			caminho.includes(`/${empresa}/${linha}.json`)
		)?.[1] as (() => Promise<{ default: Linha }>) | undefined;

		if (!loader) return undefined;

		const linhaCarregada = (await loader()).default;

		if (!linhaCarregada) return undefined;

		return [linhaCarregada, nomeEmpresa];
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

export const entries: EntryGenerator = async () => {
	const entradas: RouteParams[] = [];

	for (const path in dadosEmpresa) {
		const dados = dadosEmpresa[path].default;
		const linhas = dados.linhas as { slug: string }[];

		for (const { slug } of linhas) {
			const [empresaSlug, linhaSlug] = slug.split('/');

			const loader = Object.entries(dadosLinhas).find(([caminho]) =>
				caminho.includes(`/${slug}.json`)
			)?.[1] as (() => Promise<{ default: any }>) | undefined;

			if (!loader) continue;

			const dadosLinha = (await loader()).default;
			const servicos = Object.entries(dadosLinha.servicos) as [string, [any]][];

			entradas.push({
				empresa: empresaSlug,
				linha: linhaSlug
			});

			for (const [dia, servs] of servicos) {
				servs.forEach((_, i) => {
					entradas.push({
						empresa: empresaSlug,
						linha: linhaSlug,
						dia: CODIGO_DIAS.get(Number(dia)) ?? undefined,
						sentido: i.toString()
					});
				});
			}
		}
	}

	return entradas;
};

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
	// console.log(dados);

	if (!dados) {
		throw error(404, { message: 'linha não encontrada' });
	}

	const [linha, nomeEmpresa] = dados;

	const diasServicos = Object.keys(linha.servicos);
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
		dadosLinha: {
			nome: linha.nome,
			detalhe: linha.detalhe,
			codigo: linha.codigo,
			empresa: nomeEmpresa
		},

		dias: diasServicos,
		dia: dia!,
		servico: linha.servicos[dia][idxSentido],
		servicos: linha.servicos[dia],

		linha,
		nomeEmpresa,
		idxSentido,
		itemPesquisa: nomeEmpresa ? cacheEmpresas.ler(nomeEmpresa, linha.nome, linha.codigo) : null
	};
};
