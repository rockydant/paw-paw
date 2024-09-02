<script lang="ts">
	import FlowbiteSvelteLayout from './layouts/MainLayout.svelte';
	import type { PageData } from './$types';
	import Featured from './landing/Featured.svelte';
	import Hero from './landing/Hero.svelte';
	import Footer from './utils/utils/Footer.svelte';
	import DesignFigma from './landing/DesignFigma.svelte';
	import GetStarted from './landing/GetStarted.svelte';
	import CTA from './landing/CTA.svelte';

	export let data: PageData;

	let title = 'Flowbite Svelte - UI Component Library';
	let description =
		'Flowbite Svelte is an open-source UI component library built with Svelte components, Tailwind CSS utility classes and based on the Flowbite design system and components.';
	let default_title = 'Svelte UI Components';
	const image = `https://open-graph-vercel.vercel.app/api/flowbite-svelte?title=${default_title}`;
</script>

<FlowbiteSvelteLayout>
	<main
		class="min-w-0 flex-auto divide-y lg:static lg:max-h-full lg:overflow-visible dark:divide-gray-700"
	>
		<Hero />
		<Featured />
		<CTA />
		<DesignFigma />
		<GetStarted />
		<Footer />
	</main>
</FlowbiteSvelteLayout>
