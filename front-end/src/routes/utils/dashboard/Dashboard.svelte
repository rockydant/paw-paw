<script lang="ts">
	import thickbars from '../graphs/thickbars';
	import ChartWidget from '../widgets/ChartWidget.svelte';
	import { Card, Chart } from 'flowbite-svelte';
	// // import type { PageData } from '../../routes/(sidebar)/$types';
	// import type { PageData } from '../../(sidebar)/$types';
	import Stats from './Stats.svelte';

	import users from '../graphs/users';
	import DarkChart from '../widgets/DarkChart.svelte';
	import { onMount } from 'svelte';
	import ActivityList from './ActivityList.svelte';
	import Change from './Change.svelte';
	import Chat from './Chat.svelte';
	import DesktopPc from './DesktopPc.svelte';
	import Insights from './Insights.svelte';
	import Traffic from './Traffic.svelte';
	import Transactions from './Transactions.svelte';

	let dark = false;

	function handler(ev: Event) {
		if ('detail' in ev) {
			dark = !!ev.detail;
		}
	}

	onMount(() => {
		document.addEventListener('dark', handler);
		return () => document.removeEventListener('dark', handler);
	});
</script>

<div class="mt-px space-y-4">
	<div class="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
		<Stats />
		<Stats />
	</div>
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<p>New products</p>
				<p class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
					2,340
				</p>
				<Change size="sm" value={12.5} since="Since last month" />
			</div>
			<!-- <Chart options={thickbars} class="w-full" /> -->
		</Card>
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<p>Users</p>
				<p class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
					4,420
				</p>
				<Change size="sm" value={-3.4} since="Since last month" />
			</div>
		</Card>
	</div>
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
		<Chat />
		<div class="flex flex-col gap-4">
			<DesktopPc />
			<Traffic {dark} />
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
		<ActivityList />
		<Insights />
	</div>

	<Transactions {dark} />
</div>
