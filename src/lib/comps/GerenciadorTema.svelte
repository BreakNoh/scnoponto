<script lang="ts">
	import { browser } from '$app/environment';
	// import { gerarCores, type Tema } from '$lib/temas';
	import { gerarPaleta, storeTema, type Tema } from '$lib/stores/tema.svelte';

	export function aplicarTema(tema: Tema) {
		if (!browser || typeof document === undefined) return;

		const root = document.documentElement;
		const paleta = gerarPaleta(tema);
		// console.log(paleta);

		Object.entries(paleta).forEach(([campo, val]) => {
			root.style.setProperty(`--${campo}`, val);
		});

		// paleta.entries().forEach(([nome, cor]) => {
		// 	root.style.setProperty(`--cor-${nome}`, cor);
		// });
	}

	// aplicarTema($storeTema);

	storeTema.subscribe((t) => aplicarTema(t as Tema));
</script>
