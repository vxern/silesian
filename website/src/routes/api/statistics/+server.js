import { json } from "@sveltejs/kit";

export function GET() {
  return json({ imported: { total: 1, this_month: 1 } });
}