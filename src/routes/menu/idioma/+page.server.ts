import type { PageLoad } from './$types';
import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const cacheIdiomas: string[][] = [];

export const load: PageLoad = async () => {
	if (cacheIdiomas.length > 0) return cacheIdiomas;

	try {
		const dirIdiomas = resolve(process.cwd(), 'src', 'lib', 'idiomas');
		for await (const arq of await readdir(dirIdiomas)) {
			const conteudo = await readFile(resolve(dirIdiomas, arq), { encoding: 'utf-8' });
			const json = JSON.parse(conteudo);

			if (!json.nomeIdioma) continue;

			cacheIdiomas.push([arq.replace('.json', ''), json.nomeIdioma]);
		}
	} catch (e) {
		console.log('erro ao carregar idiomas', e);
	}

	return { idiomas: cacheIdiomas };
};
