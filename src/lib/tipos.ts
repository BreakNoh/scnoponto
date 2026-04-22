export type Observacao = {
	tipo: string;
	valor?: string;
};

export type Linha = {
	nome: string;
	codigo?: string;
	detalhe?: string;
	servicos: Map<Dia, Servico[]>;
	empresa?: string;
	favorita?: boolean;
	endpoint: string;
};

export type Dia = 'dias-uteis' | 'sabado' | 'domingo-feriados';

export type Servico = {
	sentido?: string;
	dias: Dia;
	horarios: Horario[];
};

export type Horario = {
	hora: string;
	obs?: Observacao[];
};
