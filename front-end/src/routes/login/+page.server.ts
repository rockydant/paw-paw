import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request, cookies }) => {
		const data = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		try {
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
			console.log(locals.pb.authStore.token);

			const token = locals.pb.authStore.token;
			if (!token || typeof token !== 'string') {
				throw redirect(303, '/auth');
			}

			cookies.set('pb_auth', JSON.stringify({ token: token }), { path: '/' });
		} catch (e) {
			console.error(e);
			throw e;
		}

		//redirect(303, '/');
	}
};
