<script lang="ts">
	import { browser } from '$app/environment';
	import { storeTema } from '$lib/stores/storeTema';
	import { gerarCores, type Tema } from '$lib/temas';

	export function aplicarTema(tema: Tema) {
		if (!browser || typeof document === undefined) return;

		const root = document.documentElement;
		const paleta = gerarCores(tema);
		// console.log(paleta);

		paleta.entries().forEach(([nome, cor]) => {
			root.style.setProperty(`--cor-${nome}`, cor);
		});
	}

	// aplicarTema($storeTema);
	storeTema.subscribe(aplicarTema);
</script>
