import { dadosEmpresa, dadosLinhas } from './cache';
import type { Linha } from '$lib/tipos';

export async function carregarLinha(
	empresa: string,
	linha: string
): Promise<(Linha & { empresa: string }) | undefined> {
	try {
		const nomeEmpresa =
			(
				Object.entries(dadosEmpresa)
					.find(([k, _]) => k.includes(`/${empresa}/`))
					?.at(1) as { default: { nome: string } } | undefined
			)?.default.nome ?? '';

		const loader = Object.entries(dadosLinhas).find(([caminho]) =>
			caminho.includes(`/${empresa}/${linha}.json`)
		)?.[1] as (() => Promise<{ default: Linha }>) | undefined;

		if (!loader) return undefined;

		const linhaCarregada = (await loader()).default;

		if (!linhaCarregada) return undefined;

		return { ...linhaCarregada, empresa: nomeEmpresa };
	} catch {
		return undefined;
	}
}
