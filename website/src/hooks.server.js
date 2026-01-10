import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { handle as handleAuthentication } from "./auth";

const handleParaglide = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
	event.request = request;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
	});
});

const handleSession = async ({ event, resolve }) => {
	event.locals.session = await event.locals.getSession();

	return resolve(event);
};

export const handle = sequence(handleParaglide, handleAuthentication, handleSession);
