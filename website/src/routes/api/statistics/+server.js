import { json } from "@sveltejs/kit";

export function GET() {
  return json({ imported: { total: 0, this_month: 0 } });
}