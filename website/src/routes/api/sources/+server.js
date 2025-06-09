import { json } from "@sveltejs/kit";
import sources from "$lib/constants/api/sources"

export function GET() {
  return json(sources);
}