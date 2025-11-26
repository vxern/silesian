import { db } from "$lib/database.server";

export const load = async ({ params }) => {
  // TODO(vxern): Filter the status as well.
  const lemma = params.lemma;

  return {
    // TODO(vxern): IMPORTANT - This needs to be a lot smarter.
    entries: db.query.entries.findMany({ where: (entries, { like }) => like(entries.lemma, lemma) })
  };
};
