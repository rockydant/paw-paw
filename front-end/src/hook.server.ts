import { createInstance } from '$lib/pocketbase/pocketbase';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const authentication: Handle = async ({ event, resolve }) => {
	const pb = createInstance();

	// load the store data from the request cookie string
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh();
		}
	} catch (_) {
        console.log(_)
		// clear the auth store on failed refresh
		pb.authStore.clear();
	}

	event.locals.pb = pb;
	event.locals.user = pb.authStore.model;

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};

const unprotectedPrefix = ['/login'];
export const authorization: Handle = async ({ event, resolve }) => {
	// Protect any routes under /authenticated
	if (
		!unprotectedPrefix.some((path) => event.url.pathname.startsWith(path)) &&
		event.url.pathname !== '/'
	) {
		const loggedIn = await event.locals.pb.authStore;
		if (!loggedIn) {
			throw redirect(303, '/login');
		}
	}

	// If the request is still here, just proceed as normally
	const result = await resolve(event);
	return result;
};

export const handle = sequence(authentication, authorization);
