import { browser } from '$app/environment';
import type { Linha } from './tipos';
import { openDB } from 'idb';

let promessaDB;

if (browser) {
	promessaDB = openDB('scnoponto', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('linhas')) {
				db.createObjectStore('linhas', { keyPath: 'endpoint' });
			}
		}
	});
}

export async function salvarLinhaCache(linha: Linha, favorita: boolean = false) {
	if (!promessaDB) return;
	linha.favorita = favorita;
	const db = await promessaDB;
	db.put('linhas', linha);
}

export async function lerLinhaCache(caminho: string): Promise<Linha | null> {
	if (!promessaDB) return null;
	const db = await promessaDB;

	const linha = await db.get('linhas', caminho);
	return linha ?? null;
}

export async function deletarLinhaCache(caminho: string) {
	if (!promessaDB) return;
	const db = await promessaDB;
	db.delete('linhas', caminho);
}
