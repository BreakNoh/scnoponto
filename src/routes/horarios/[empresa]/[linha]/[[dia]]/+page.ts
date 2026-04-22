import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { lerLinhaCache, salvarLinhaCache } from '$lib/cache';

export const load: PageLoad = async ({ data }) => {
	if (browser) {
		const linhaCache = await lerLinhaCache(data.linha.endpoint);

		salvarLinhaCache(data.linha, linhaCache?.favorita ?? false);
		data.linha.favorita = linhaCache?.favorita;
	}

	return data;
};
