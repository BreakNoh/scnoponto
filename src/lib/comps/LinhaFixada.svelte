<script lang="ts">
	import Colapsavel from './Colapsavel.svelte';
	import type { Linha, Dia } from '$lib/tipos';
	let { linha, dia }: { linha: Linha; dia: Dia } = $props();
</script>

<Colapsavel titulo={linha.nome}>
	{linha.servicos}
</Colapsavel>
