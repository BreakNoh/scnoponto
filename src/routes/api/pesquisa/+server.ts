import pesquisar, { schemaPesquisa } from '$lib/server/pesquisa';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request: req }) => {
	const pesquisa = schemaPesquisa.safeParse(await req.json());

	if (!pesquisa.success) return new Response(null, { status: 400 });

	return new Response(JSON.stringify(await pesquisar(pesquisa.data)));
};
