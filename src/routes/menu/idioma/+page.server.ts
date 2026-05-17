import type { PageLoad } from './$types';

const cacheIdiomas: string[][] = [];

const dadosIdiomas = import.meta.glob('$lib/idiomas/*.json', { eager: true });

export const load: PageLoad = async () => {
	if (cacheIdiomas.length > 0) return { idiomas: cacheIdiomas };

	try {
		for (const path in dadosIdiomas) {
			const json = (dadosIdiomas[path] as any).default;

			if (!json.nomeIdioma) continue;

			const nomeArq = path.split('/').at(-1)?.replace('.json', '') ?? '';
			cacheIdiomas.push([nomeArq, json.nomeIdioma]);
		}
	} catch (e) {
		console.log('erro ao carregar idiomas', e);
	}

	return { idiomas: cacheIdiomas };
};
