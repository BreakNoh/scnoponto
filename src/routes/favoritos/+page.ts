import { browser } from '$app/environment';
import { LINHA_TESTE } from '$lib/linhas';
import type { Linha } from '$lib/tipos';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (browser) {
		const cache = new (await import('$lib/cache')).default();
		return {
			favoritos: await cache.linhasFavoritas()
		};
	}

	return {
		favoritos: []
	};
};
