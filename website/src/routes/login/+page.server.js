import { redirect } from "@sveltejs/kit";
import { signIn } from "../../auth";

export const load = async (event) => {
    if (event.locals.session) {
        redirect(303, "/account");
    }
};

export const actions = { default: signIn };
