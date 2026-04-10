export type Linha = {
	id: number;
	nome: string;
	codigo?: string;
	servicos: Map<Dia, Servico[]>;
};

export type Dia = 'dias-uteis' | 'sabado' | 'domingo-feriados';

export type Servico = {
	sentido?: string;
	dias: Dia;
	horarios: Horario[];
};

export type Horario = {
	hora: string;
	obs: string[];
};
