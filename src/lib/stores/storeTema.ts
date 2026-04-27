import { browser } from '$app/environment';
import { type Tema } from '$lib/temas';
import { writable } from 'svelte/store';

export let storeTema = writable<Tema>({
	primaria: browser ? (localStorage.getItem('temaCor') ?? 'AccentColor') : 'AccentColor',
	escuro: browser
		? localStorage.getItem('temaEscuro') === 'true' ||
			window.matchMedia('(prefers-color-scheme: dark)').matches
		: false
});
