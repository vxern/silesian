import { json } from "@sveltejs/kit";
import popular from "$lib/constants/api/popular"

export function GET({ url: { searchParams } }) {
  return json(popular.slice(0, searchParams.get("limit") ?? 100));
}