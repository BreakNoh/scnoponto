export type Observacao = {
	tipo: string;
	valor?: string;
};

export type Linha = {
	id: number;
	codigo?: string;
	nome: string;
	detalhe?: string;
	servicos: Map<Dia, Servico[]>;
	endpoint: string;
	empresa?: string;
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
