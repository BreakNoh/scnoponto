import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import z from 'zod';

export const schemaFiltro = z
	.object({
		emp: z.array(z.string()).optional(),
		reg: z.array(z.string()).optional()
	})
	.catch({});

export const storeFiltros = writable(browser ? carregarFiltros() : undefined);

function carregarFiltros() {
	try {
		const json = JSON.parse(localStorage.getItem('filtros') ?? '');
		return schemaFiltro.parse(json);
	} catch {
		return {};
	}
}

storeFiltros.subscribe((v) =>
	browser ? localStorage.setItem('filtros', JSON.stringify(v)) : undefined
);
