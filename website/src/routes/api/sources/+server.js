import { json } from "@sveltejs/kit";
import sources from "$lib/api/constants/sources"

export function GET() {
  return json(sources);
}