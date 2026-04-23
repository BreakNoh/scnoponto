import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ data }) => {
	if (browser) {
		const cache = new (await import('$lib/cache')).default();

		const linhaCache = await cache.ler(data.linha.endpoint);

		if (linhaCache) {
			cache.salvar({ ...data.linha, favorita: linhaCache.favorita });
			data.linha.favorita = linhaCache.favorita;
		}
	}

	return data;
};
