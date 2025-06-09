import { redirect } from '@sveltejs/kit';
import constants from "$lib/constants/core";

export function load() {
	redirect(308, constants.links.discord);
}