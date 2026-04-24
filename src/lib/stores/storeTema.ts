import { type Tema } from '$lib/temas';
import { writable } from 'svelte/store';

export let storeTema = writable<Tema>({
	primaria: 'olive',
	escuro: true
});
