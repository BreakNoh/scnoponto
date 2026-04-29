import { browser } from '$app/environment';
import type { Idioma } from '$lib/tipos';
import { carregarLingaguem } from '$lib/utils';
import { writable } from 'svelte/store';

const linguaLocal = browser ? localStorage.getItem('idioma') : null;

export let storeIdioma = writable<Idioma>(await carregarLingaguem(linguaLocal));
