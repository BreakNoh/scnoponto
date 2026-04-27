import type { ItemPesquisa } from '$lib/tipos';

export const CAMINHO_DADOS = `${process.cwd()}/src/lib/server/dados`;

class CacheEmpresa {
	empresas = new Map<string, ItemPesquisa[]>();
	iniciado = false;

	inserir(nomeEmpresa: string, itens: ItemPesquisa[]) {
		this.iniciado = true;
		this.empresas.set(nomeEmpresa, itens);
	}

	ler(nomeEmpresa: string, nome: string, codigo: string | undefined) {
		return this.empresas
			.get(nomeEmpresa)
			?.find((v) => v.codigo_linha == codigo && v.nome_linha == nome);
	}
}

export const cacheEmpresas = new CacheEmpresa();
