import { redirect } from '@sveltejs/kit';
import constants from "$lib/constants";

export function load() {
	redirect(308, constants.links.github);
}