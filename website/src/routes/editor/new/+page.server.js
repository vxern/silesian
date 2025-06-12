export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();

    const word = data.get("word");
    const source = data.get("source");
    const contents = data.get("contents");

    const result = await locals.sql`INSERT INTO entries (word, source, contents) VALUES (${word}, ${source}, ${contents})`;
  },
};