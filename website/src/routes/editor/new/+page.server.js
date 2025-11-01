import { redirect } from "@sveltejs/kit";

// TODO(vxern): Actually implement the actions.

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const word = data.get("word");
    const source = data.get("source");
    const contents = data.get("contents");

    const result = await locals.sql`INSERT INTO entries (word, source, contents) VALUES (${word}, ${source}, ${contents}) RETURNING *`;

    // TODO(vxern): Handle failure.
    // TODO(vxern): Validate.

    redirect(303, `/editor/word/${word}`);
  },
  "save-as-draft": async ({ request, locals }) => {
    const data = await request.formData();

    const word = data.get("word");
    const source = data.get("source");
    const contents = data.get("contents");

    const result = await locals.sql`INSERT INTO entries (word, source, contents) VALUES (${word}, ${source}, ${contents}) RETURNING *`;

    // TODO(vxern): Handle failure.
    // TODO(vxern): Validate.

    redirect(303, `/editor/word/${word}`);
  },
};