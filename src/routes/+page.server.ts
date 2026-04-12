import type { Linha, Servico, Dia } from '$lib/tipos';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (): { linha: Linha; dia: Dia } => {
	const servico_a: Servico = {
		sentido: 'Ida',
		dias: 'dias-uteis',
		horarios: [
			{ hora: '01:01', obs: [] },
			{ hora: '02:02', obs: [] },
			{ hora: '03:03', obs: [] },
			{ hora: '04:04', obs: [] },
			{ hora: '05:05', obs: [] }
		]
	};
	const servico_b: Servico = { sentido: 'Volta', ...servico_a };
	return {
		linha: {
			id: 69,
			nome: 'Linha Teste ',
			codigo: '123',
			servicos: new Map([
				['dias-uteis', [servico_a, servico_b]],
				['sabado', [servico_a, servico_b]],
				['domingo-feriados', [servico_a, servico_b]]
			])
		} satisfies Linha,
		dia: 'dias-uteis'
	};
};
