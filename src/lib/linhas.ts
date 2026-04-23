import type { Servico, Linha, Dia, Horario } from './tipos';

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
		{ hora: '15:15' },
		{ hora: '07:05', obs: [] },
		{ hora: '08:05', obs: [] },
		{ hora: '09:05', obs: [] },
		{ hora: '10:05', obs: [] },
		{ hora: '11:05', obs: [] },
		{ hora: '12:05', obs: [] }
	]
};
const NOMES = [
	'lindo',
	'breno',
	'oreo',
	'cleiton',
	'fabiane',
	'maria',
	'reinaldo',
	'linda',
	'abacaxi',
	'abacate'
];

function nomeAleatorio(): string {
	return NOMES[Math.floor(Math.random() * NOMES.length)];
}

function gerarMockServico(): Servico {
	const DIAS: Dia[] = ['dias-uteis', 'sabado', 'domingo-feriados'];
	const sentido = {
		sentido: nomeAleatorio(),
		dias: DIAS[Math.floor(Math.random() * DIAS.length)],
		horarios: Array(Math.floor(Math.random() * 23)).map((_, i) => ({
			hora: `${i.toString().padStart(2)}:${i.toString().padStart(2)}`
		}))
	};

	console.log(sentido);
	return sentido;
}

export function gerarLinhaMock(): Linha {
	const linha = {
		nome: `${nomeAleatorio()} ${nomeAleatorio()}`,
		codigo: Math.floor(Math.random() * 999).toString(),
		servicos: new Map<Dia, Servico[]>([
			['dias-uteis', [gerarMockServico()]],
			['sabado', [gerarMockServico(), gerarMockServico()]],
			['domingo-feriados', [gerarMockServico(), gerarMockServico(), gerarMockServico()]]
		]),
		endpoint: `/horarios/${nomeAleatorio()}/${nomeAleatorio()}`,
		empresa: nomeAleatorio(),
		favorita: 0
	};

	return linha;
}
const servico_b: Servico = { sentido: 'Volta', ...servico_a };

export const LINHA_TESTE = {
	nome: 'Linha Teste ',
	codigo: '123',
	servicos: new Map([
		['dias-uteis', [servico_a, servico_b]],
		['sabado', [servico_a, servico_b]],
		['domingo-feriados', [servico_a, servico_b]]
	]),
	endpoint: '/horarios/empresa/linha',
	empresa: 'empresa',
	favorita: 0
} satisfies Linha;

export const LINHAS: ItemLinha[] = [
	{
		nome: 'Circular Centro A',
		codigo: '101',
		empresa: 'TransLuz',
		caminho: '/linhas/101/'
	},
	{
		nome: 'Circular Centro B',
		codigo: '101',
		empresa: 'TransLuz',
		caminho: '/linhas/101/'
	},
	{
		nome: 'Circular Centro C',
		codigo: '101',
		empresa: 'TransLuz',
		caminho: '/linhas/101/'
	},
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
