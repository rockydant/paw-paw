<script lang="ts">
	import { page } from '$app/stores';
	//import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from '$lib';
	import DarkMode from '$lib/darkmode/DarkMode.svelte';
	import Tooltip from '$lib/tooltip/Tooltip.svelte';
	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	import DocBadge from '../utils/utils/DocBadge.svelte';
	import Discord from '../utils/utils/icons/Discord.svelte';
	import GitHub from '../utils/utils/icons/GitHub.svelte';
	import YouTube from '../utils/utils/icons/YouTube.svelte';
	import ToolbarLink from '../utils/utils/ToolbarLink.svelte';
	import AlgoliaSearch from '../utils/utils/AlgoliaSearch.svelte';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import NavHamburger from '$lib/navbar/NavHamburger.svelte';
	import NavBrand from '$lib/navbar/NavBrand.svelte';
	import NavUl from '$lib/navbar/NavUl.svelte';
	import NavLi from '$lib/navbar/NavLi.svelte';
	import { UserCircleOutline } from 'flowbite-svelte-icons';

	let isHomePage: boolean;
	$: isHomePage = $page.route.id === '/';
	const version = '0.0.1';
	$: activeUrl = $page.url.pathname;
	let logo = '/images/flowbite-svelte-icon-logo.svg';
	let divClass = 'w-full ms-auto lg:block lg:w-auto order-1 lg:order-none';
	let ulClass =
		'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium text-gray-900 dark:text-gray-300 gap-4';

	const drawerHiddenStore: Writable<boolean> = writable<boolean>(true);
	setContext('drawer', drawerHiddenStore);

	setContext('testC', 'test for textContext');

	const toggleDrawer = () => {
		drawerHiddenStore.update((state) => !state);
	};

	onMount(() => {
		// Workaround until https://github.com/sveltejs/kit/issues/2664 is fixed
		if (typeof window !== 'undefined' && window.location.hash) {
			const deepLinkedElement = document.getElementById(window.location.hash.substring(1));

			if (deepLinkedElement) {
				window.setTimeout(() => deepLinkedElement.scrollIntoView(), 100);
			}
		}
	});
</script>

<header
	class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar
		color="default"
		fluid
		class="py-1.5 {isHomePage ? 'mx-auto max-w-7xl lg:px-0' : ''}"
		let:toggle
	>
		<span hidden={$page.route.id === '/'}>
			<NavHamburger onClick={toggleDrawer} class="m-0 me-3 md:block lg:hidden" />
		</span>
		<NavBrand href="/">
			<img src={logo} class="me-3 h-8" alt="Flowbite Svelte Logo" />
			<span
				class="self-center whitespace-nowrap text-2xl font-semibold text-gray-900 dark:text-white"
			>
				Flowbite Svelte
			</span>
		</NavBrand>

		{#if !isHomePage}
			<AlgoliaSearch />
		{:else}
			<div id="home">
				<AlgoliaSearch />
			</div>
		{/if}

		<NavUl
			{divClass}
			{ulClass}
			{activeUrl}
			on:click={() => setTimeout(toggle, 1)}
			nonActiveClass="md:!ps-3 md:!py-2 lg:!ps-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
			activeClass="md:!ps-3 md:!py-2 lg:!ps-0 text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:dark:text-primary-700 dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
		>
			<NavLi class="lg:mb-0 lg:px-2" href="/">Home</NavLi>
			<NavLi class="lg:mb-0 lg:px-2" href="/docs/pages/introduction">Docs</NavLi>
			<NavLi class="lg:mb-0 lg:px-2" href="/docs/components/accordion">Components</NavLi>
			<NavLi class="lg:mb-0 lg:px-2" href="/icons/svelte-4">Icons</NavLi>
			<NavLi class="lg:mb-0 lg:px-2" href="/blocks">Blocks</NavLi>
			<NavLi class="lg:mb-0 lg:px-2" href="/admin-dashboard">Dashboard</NavLi>
		</NavUl>

		<div class="ms-auto flex items-center">
			<ToolbarLink
				class="hidden hover:text-gray-900 focus:ring-0 sm:inline-block dark:hover:text-white"
				name="View on GitHub"
				href="https://github.com/themesberg/flowbite-svelte"
			>
				<GitHub />
			</ToolbarLink>
			<ToolbarLink
				class="hidden hover:text-gray-900 focus:ring-0 xl:inline-block dark:hover:text-white"
				name="Join community on Discord"
				href="https://discord.gg/4eeurUVvTy"
			>
				<Discord />
			</ToolbarLink>
			<ToolbarLink
				class="hidden hover:text-gray-900 focus:ring-0 xl:inline-block dark:hover:text-white"
				name="Subscribe to YouTube channel"
				href="https://www.youtube.com/channel/UC_Ms4V2kYDsh7F_CSsHyQ6A"
			>
				<YouTube />
			</ToolbarLink>
			<ToolbarLink
				class="hidden hover:text-gray-900 focus:ring-0 xl:inline-block dark:hover:text-white"
				name="Login"
				href="/login"
			>
				<UserCircleOutline />
			</ToolbarLink>
			<DarkMode size="lg" class="inline-block hover:text-gray-900 dark:hover:text-white" />
			<Tooltip class="dark:bg-gray-900" placement="bottom-end">Toggle dark mode</Tooltip>
		</div>
		<NavHamburger
			on:click={toggle}
			class="m-0 ms-3 md:block lg:hidden {isHomePage ? '' : 'hidden'}"
		/>
	</Navbar>
</header>

<div class="w-full lg:flex dark:bg-gray-900">
	<slot />
</div>
