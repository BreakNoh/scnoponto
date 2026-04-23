<script lang="ts">
	import { storeTema } from '$lib/stores/storeTema';
	import { gerarCores, type Tema } from '$lib/temas';

	function aplicarTema(tema: Tema) {
		if (typeof document === undefined) return;

		const root = document.documentElement;
		const paleta = gerarCores(tema);

		paleta.entries().forEach(([nome, cor]) => {
			root.style.setProperty(`--cor-${nome}`, cor);
		});
	}

	// aplicarTema($storeTema);
	$effect(() => {
		aplicarTema($storeTema);
	});
</script>
