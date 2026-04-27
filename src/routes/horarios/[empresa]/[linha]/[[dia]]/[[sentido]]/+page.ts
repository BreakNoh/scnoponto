import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ data, params }) => {
	const dadosComFav = { favorito: false, ...data };

	if (browser) {
		const db = await (await import('$lib/cache.js')).DB;
		const slug = `${params.empresa}/${params.linha}`;

		dadosComFav.favorito = !!(await db.get('favoritos', slug));
	}

	return dadosComFav;
};
