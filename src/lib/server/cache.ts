import type { ItemPesquisa } from '$lib/tipos';
import { glob, readFile } from 'node:fs/promises';

export const CAMINHO_DADOS = `${process.cwd()}/src/lib/server/dados`;

class CacheEmpresa {
	private dadosEmpresas = new Map<string, ItemPesquisa[]>();
	private iniciado = false;

	public async iniciar() {
		if (this.iniciado) return;
		this.iniciado = true;

		for await (const arq of glob(`**/_self.json`)) {
			const json = await readFile(arq, { encoding: 'utf-8' });
			const dados = JSON.parse(json);

			if (!dados.linhas) continue;
			const itensEmpresa = dados.linhas as ItemPesquisa[];

			if (!dados.nome) continue;
			cacheEmpresas.inserir(dados.nome, itensEmpresa);
		}
	}

	public empresas() {
		return this.dadosEmpresas.keys().toArray();
	}

	public itens() {
		return this.dadosEmpresas
			.values()
			.flatMap((v) => v)
			.toArray();
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
