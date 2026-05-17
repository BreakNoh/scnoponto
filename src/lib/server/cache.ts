import type { ItemPesquisa } from '$lib/tipos';

export const dadosEmpresa = import.meta.glob('./dados/*/_self.json', {
	eager: true
}) as Record<string, { default: { nome: string; linhas: ItemPesquisa[]; slug: string } }>;

export const dadosLinhas = import.meta.glob(['./dados/*/*.json', '!./dados/*/_self.json']);

class CacheEmpresa {
	private dadosEmpresas = new Map<string, ItemPesquisa[]>();
	private iniciado = false;

	public async iniciar() {
		if (this.iniciado) return;
		this.iniciado = true;

		for (const path in dadosEmpresa) {
			const dados = dadosEmpresa[path].default;

			if (!dados.linhas) continue;
			const itensEmpresa = dados.linhas as ItemPesquisa[];

			if (!dados.nome) continue;
			this.inserir(dados.nome, itensEmpresa);
		}
	}

	public empresas() {
		return Array.from(this.dadosEmpresas.keys());
	}

	public itens() {
		return Array.from(this.dadosEmpresas.values()).flatMap((v) => v);
	}

	public inserir(nomeEmpresa: string, itens: ItemPesquisa[]) {
		this.iniciado = true;
		this.dadosEmpresas.set(nomeEmpresa, itens);
	}

	public ler(nomeEmpresa: string, nome: string, codigo: string | undefined) {
		return this.dadosEmpresas
			.get(nomeEmpresa)
			?.find((v) => v.codigo_linha == codigo && v.nome_linha == nome);
	}
}

export const cacheEmpresas = new CacheEmpresa();
