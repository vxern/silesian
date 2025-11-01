import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { handle as handleAuthentication } from "./auth";
import { db } from "$lib/database.server";

const handleParaglide = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
	event.request = request;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
	});
});

const handleDatabase = ({ event, resolve }) => {
  event.locals = { db };

  return resolve(event);
};

export const handle = sequence(handleParaglide, handleDatabase, handleAuthentication);
