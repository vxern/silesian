import { json } from "@sveltejs/kit";
import sources from "$lib/api/sources"

export function GET() {
  return json(sources);
}