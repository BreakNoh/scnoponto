export type Observacao = {
	tipo: string;
	valor: string;
};

export type ItemPesquisa = {
	nome_linha: string | undefined;
	nome_empresa: string;
	codigo_linha: string | undefined;
	slug: string;
};

export type Linha = {
	nome: string;
	codigo?: string;
	detalhe?: string;
	servicos: Map<Dias, Servico[]>;
	slug: string;
};

export type Servico = {
	sentido: string;
	dias: Dias;
	horarios: Horario[];
};

export type Horario = {
	hora: string;
	obs: Observacao[];
};

export type Dias = number;

export const DIAS = {
	domingoFeriados: 1 << 6,
	uteis: 0b0111110,
	sabado: 1
};
