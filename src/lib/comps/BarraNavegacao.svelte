<script lang="ts">
	import { page } from '$app/state';
	import { Heart, BusFront, Menu } from '@lucide/svelte';
</script>

<nav>
	<div class="conteiner">
		<a href="/favoritos" class:ativo={page.url.pathname.includes('/favoritos')}>
			<div class="wrapper-icone">
				<Heart />
			</div>
			<span>favoritos</span>
		</a>
		<a href="/" class:ativo={page.url.pathname.includes('/horarios') || page.url.pathname == '/'}>
			<div class="wrapper-icone">
				<BusFront />
			</div>
			<span>horários</span>
		</a>
		<a href="/menu" class:ativo={page.url.pathname.includes('/menu')}>
			<div class="wrapper-icone">
				<Menu />
			</div>
			<span>mais</span>
		</a>
	</div>
</nav>

<style>
	nav {
		position: fixed;

		left: 0;
		right: 0;
		bottom: 0;

		background-color: white;

		padding-inline: 5%;
		padding-top: 8px;
		padding-bottom: calc(env(safe-area-inset-bottom, 0) + 8px); /* Protege o fundo */
	}

	div.conteiner {
		display: flex;
		padding-block: 4px;
		padding-inline: 4px;
		border-radius: 16px;
		background-color: lightskyblue;

		gap: 8px;
	}

	a {
		flex: 1;
		padding: 8px;
		display: flex;
		flex-direction: column;
		place-content: center;

		text-align: center;
		color: black;
		text-decoration: none;
	}

	a span {
		@media (max-width: 300px) {
			display: none;
		}
	}

	a.ativo {
		border-radius: 16px;
		background-color: deepskyblue;
	}
</style>
