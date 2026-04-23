import type { Linha } from './tipos';
import { openDB, deleteDB } from 'idb';

const promessaDB = openDB('scnoponto', 2, {
	upgrade(db) {
		if (!db.objectStoreNames.contains('linhas')) {
			const store = db.createObjectStore('linhas', { keyPath: 'endpoint' });

			if (!store.indexNames.contains('ehFavorita')) {
				store.createIndex('ehFavorita', 'favorita');
			}
		}
	}
});

export default class CacheLinha {
	async salvar(linha: Linha) {
		const db = await promessaDB;
		db.put('linhas', linha);
	}

	async ler(caminho: string): Promise<Linha | null> {
		const db = await promessaDB;
		const linha = await db.get('linhas', caminho);

		return linha ?? null;
	}

	async linhasFavoritas(): Promise<Linha[]> {
		const db = await promessaDB;
		const linhas = await db.getAllFromIndex('linhas', 'ehFavorita', 1);
		return linhas;
	}

	async deletar(caminho: string) {
		const db = await promessaDB;
		db.delete('linhas', caminho);
	}
}
