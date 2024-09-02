/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const status = +params.code;
	let pageName = '500';

	if (isNaN(status) || status < 400 || status > 599) {
		pageName = '500';
	} else {
		/** @type {import('@sveltejs/kit').NumericRange<400,599>} */
		pageName = '400';
	}

	const post = await import(`../${pageName}.svelte`);
	// const { title, dir } = post.metadata;
	const content = post.default;

	return {
		content
		// title,
		// dir
	};
}
