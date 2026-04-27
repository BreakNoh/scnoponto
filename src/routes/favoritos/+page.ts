import { browser } from '$app/environment';
import { LINHA_TESTE } from '$lib/linhas';
import type { ItemPesquisa, Linha } from '$lib/tipos';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (browser) {
		const db = await (await import('$lib/cache')).DB;

		return {
			favoritos: ((await db.getAll('favoritos')) as ItemPesquisa[]) ?? []
		};
	}

	return {
		favoritos: []
	};
};
