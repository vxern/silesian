import { json } from "@sveltejs/kit";
import history from "$lib/api/history"

// TODO(vxern): Terms should be unique and newer searches should replace old ones.
// TODO(vxern): Should only well-resolved words should be stored in the history?
export function GET({ url: { searchParams } }) {
  return json(history.slice(0, searchParams.get("limit") ?? 100));
}