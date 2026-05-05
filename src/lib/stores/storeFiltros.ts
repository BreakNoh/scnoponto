import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const storeFiltros = writable(browser ? carregarFiltros() : null);

function carregarFiltros(): string[] {
	try {
		const filtros = JSON.parse(localStorage.getItem('filtros') ?? '[]');

		return Array.isArray(filtros) ? filtros : [];
	} catch {
		localStorage.setItem('filtros', '[]');
		return [];
	}
}

storeFiltros.subscribe((v) =>
	browser ? localStorage.setItem('filtros', JSON.stringify(v)) : null
);
