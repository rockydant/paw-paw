import { fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';
import PocketBase from 'pocketbase';
import { createInstance } from '$lib/pocketbase/pocketbase';

// export const load = (async ({ locals }) => {
// 	// if (locals.pb.authStore.model) {
// 	// 	// return redirect(303, '/dashboard')
// 	// }

// 	return {};
// }) satisfies PageServerLoad;

export const actions = {
	register: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return fail(400, { emailRequired: email === null, passwordRequired: password === null });
		}

		data.set('passwordConfirm', password?.toString());
		try {
			await locals.pb.collection('users').create(data);
			await locals.pb.collection('users').authWithPassword(email.toString(), password.toString());
			await locals.pb.collection('users').requestVerification(email.toString());
		} catch (error) {
			const errorObj = error as ClientResponseError;
			console.log(errorObj);
			return fail(500, { fail: true, message: errorObj.data.message });
		}

		throw redirect(303, '/dashboard');
	},
	login: async ({ locals, request }) => {
		const pb = createInstance();
		locals.pb = pb;

		console.log('action called');
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		console.log(email);
		console.log(password);

		if (!email || !password) {
			return fail(400, { emailRequired: email === null, passwordRequired: password === null });
		}

		try {
			await locals.pb.collection('users').authWithPassword(email.toString(), password.toString());
			locals.user = locals.pb.authStore.model;
		} catch (error) {
			const errorObj = error as ClientResponseError;
			console.log(errorObj);
			return fail(500, { fail: true, message: errorObj.originalError });
		}

		throw redirect(303, '/home');
	},
	reset: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (!email) {
			return fail(400, { emailRequired: email === null });
		}

		try {
			await locals.pb.collection('users').requestPasswordReset(email.toString());
		} catch (error) {
			const errorObj = error as ClientResponseError;
			return fail(500, { fail: true, message: errorObj.data.message });
		}

		throw redirect(303, '/login');
	}
};
