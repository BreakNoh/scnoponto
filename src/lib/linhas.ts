import type { Servico, Linha } from './tipos';

export type ItemLinha = {
	nome: string;
	codigo?: string;
	empresa: string;
	caminho: string;
};

const servico_a: Servico = {
	sentido: 'Ida',
	dias: 'dias-uteis',
	horarios: [
		{ hora: '01:01', obs: [] },
		{ hora: '02:02', obs: [] },
		{ hora: '03:03', obs: [] },
		{ hora: '04:04', obs: [] },
		{ hora: '05:05', obs: [] },
		{ hora: '06:05', obs: [] },
		{ hora: '07:05', obs: [] },
		{ hora: '08:05', obs: [] },
		{ hora: '09:05', obs: [] },
		{ hora: '10:05', obs: [] },
		{ hora: '11:05', obs: [] },
		{ hora: '12:05', obs: [] }
	]
};
const servico_b: Servico = { sentido: 'Volta', ...servico_a };
export const LINHA_TESTE = {
	id: 69,
	nome: 'Linha Teste ',
	codigo: '123',
	servicos: new Map([
		['dias-uteis', [servico_a, servico_b]],
		['sabado', [servico_a, servico_b]],
		['domingo-feriados', [servico_a, servico_b]]
	])
} satisfies Linha;

export const LINHAS: ItemLinha[] = [
	{
		nome: 'Circular Centro',
		codigo: '101',
		empresa: 'TransLuz',
		caminho: '/linhas/101/'
	},
	{
		nome: 'Hospital Universitário via Beira Mar',
		codigo: '202',
		empresa: 'Expresso Municipal',
		caminho: '/linhas/202/'
	},
	{
		nome: 'Terminal Central / Bairro Novo',
		empresa: 'ViaSul',
		caminho: '/linhas/303/'
	},
	{
		nome: 'Expressa Noturna',
		empresa: 'TransLuz',
		caminho: '/linhas/404/'
	},
	{
		nome: 'Eixo Sul - Direto',
		codigo: '505',
		empresa: 'Expresso Municipal',
		caminho: '/linhas/505/'
	},
	{
		nome: 'A',
		codigo: '0',
		empresa: 'Teste',
		caminho: '/linhas/0/'
	},
	{
		nome: 'Linha com um Nome Absurdamente Longo para Testar o Efeito de Marquee ou Line Clamp na UI',
		codigo: '606',
		empresa: 'Consórcio Metropolitano de Transportes de Passageiros',
		caminho: '/linhas/606/'
	},
	{
		nome: 'Santa Catarina (Executivo)',
		empresa: 'ViaSul',
		caminho: '/linhas/707/'
	},
	{
		nome: 'Interbairros II',
		codigo: '808',
		empresa: 'Expresso Municipal',
		caminho: '/linhas/808/'
	}
];
