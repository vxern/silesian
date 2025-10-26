import { redirect } from "@sveltejs/kit";
import definitions from "../../../lib/constants/api/definitions.js";

export const actions = {
  get: async ({ request, locals }) => {
    // TODO(vxern): Implement.
    
    return json(definitions);
  },
};