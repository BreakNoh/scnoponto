export type Linha = {
	nome: string;
	codigo?: string;
};

export type Dias = number;
export type Servico = {
	sentido?: string;
	dias: Dias;
	horarios: Horario[];
};

export type Horario = {
	hora: string;
	obs: string[];
};
