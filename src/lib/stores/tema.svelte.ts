import { writable } from 'svelte/store';
import chroma from 'chroma-js';
import { browser } from '$app/environment';

export type Tema = { cor: string; tema: 'claro' | 'escuro' | 'auto' };

export const storeTema = writable({ cor: chroma('salmon').hex(), tema: 'auto' });

function temaSistema() {
	if (browser && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'escuro';
	}
	return 'claro';
}

export function gerarPaleta(tema: Tema): Record<string, string> {
	const paleta: Record<string, string> = {};

	const primaria = chroma(tema.cor);
	const escuro = tema.tema == 'escuro' || (tema.tema == 'auto' && temaSistema() == 'escuro');

	paleta['primaria'] = primaria.hex('rgb');
	paleta['secundaria'] = primaria.set('oklch.h', '+30').hex('rgb');
	paleta['terciaria'] = primaria.set('oklch.h', '+60').hex('rgb');

	paleta['fundo-base'] = chroma('white').hex('rgb');

	paleta['fundo-0'] = chroma.mix('white', primaria, 0.1, 'oklch').hex('rgb');
	paleta['fundo-1'] = chroma.mix('white', primaria, 0.1, 'oklch').darken(0.25).hex('rgb');
	paleta['fundo-2'] = chroma.mix('white', primaria, 0.1, 'oklch').darken(0.5).hex('rgb');

	paleta['texto-base'] = chroma.mix('black', primaria, 0.25, 'oklch').hex('rgb');
	paleta['texto-secundario'] = chroma.mix('black', primaria, 0.1, 'oklch').brighten().hex('rgb');
	paleta['texto-alt'] = chroma.mix('white', primaria, 0.1, 'oklch').hex('rgb');
	// paleta['texto-base-'] = chroma.mix('black', primaria, 0.1, 'oklch').hex('rgb');

	return paleta;
}
