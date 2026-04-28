<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';

	type PropsPopUp = {
		ativo: boolean;
	};
	let { ativo = $bindable(false) } = $props();

	// $effect(() => {
	// 	pushState('', { mostrarPopUp: ativo });
	// });
</script>

<!-- {#if page.state.mostrarPopUp} -->
<!-- 	<div>popoup</div> -->
<!-- {/if} -->
