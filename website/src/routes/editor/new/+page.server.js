export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const lemma = data.get("lemma");
    const contents = data.get("contents");

    const result = await sql`INSERT INTO entries (lemma, contents) VALUES (${lemma}, ${contents})`;
  },
};