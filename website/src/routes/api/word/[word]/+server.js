import { json } from "@sveltejs/kit";
import definitions from "$lib/constants/api/definitions"

export function GET({ url }) {
  return json(definitions);
}