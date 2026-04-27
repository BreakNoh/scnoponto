export type Tema = {
	escuro: boolean;
	primaria: string;
};

export function gerarCores(tema: Tema): Map<string, string> {
	const cores = new Map([['principal', tema.primaria]]);

	let base;
	if (tema.escuro) {
		base = BASE_ESCURO;
	} else {
		base = BASE_CLARO;
	}

	Object.entries(base).forEach(([k, v]) => cores.set(k, v));

	return cores;
}

export const CORES = new Map(
	Object.entries({
		'cor-roxo': 'mediumorchid',
		'cor-azul': 'dodgerblue',
		'cor-anil': 'deepskyblue',
		'cor-verde': 'limegreen',
		'cor-amarelo': 'gold',
		'cor-laranja': 'darkorange',
		'cor-vermelho': 'tomato',
		'cor-rosa': 'pink',
		'cor-cinza': 'slategrey',
		'cor-sistema': 'AccentColor'
	})
);

const BASE_CLARO = {
	'fundo-base': '#fff',
	'fundo-media': '#bbb',
	'fundo-alta': '#ddd',
	texto: '#000',
	'texto-alt': '#000',
	'texto-sec': '#111',
	'texto-sec-alt': '#111'
};

const BASE_ESCURO = {
	'fundo-base': '#1a1a1a',
	'fundo-media': '#666',
	'fundo-alta': '#444',
	texto: '#fff',
	'texto-alt': '#000',
	'texto-sec': '#eee',
	'texto-sec-alt': '#111'
};
