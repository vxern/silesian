import { json } from "@sveltejs/kit";

export function GET() {
  // TODO(vxern): This is hard-coded.
  // TODO(vxern): Terms should be unique and newer searches should replace old ones.
  return json([{
    term: "jak",
    created_at: new Date().getUTCDate(),
  }, {
    term: "widzã",
    created_at: new Date().getUTCDate(),
  }, {
    term: "mōm",
    created_at: new Date().getUTCDate(),
  }, {
    term: "ôbryncznik",
    created_at: new Date().getUTCDate(),
  }, {
    term: "kōń",
    created_at: new Date().getUTCDate(),
  }, {
    term: "śmiã",
    created_at: new Date().getUTCDate(),
  }, {
    term: "przŏć",
    created_at: new Date().getUTCDate(),
  }, {
    term: "ôstać",
    created_at: new Date().getUTCDate(),
  }, {
    term: "udŏwać",
    created_at: new Date().getUTCDate(),
  }, {
    term: "trzimiã",
    created_at: new Date().getUTCDate(),
  }, {
    term: "erb",
    created_at: new Date().getUTCDate(),
  }, {
    term: "erbowizna",
    created_at: new Date().getUTCDate(),
  }, {
    term: "erbować",
    created_at: new Date().getUTCDate(),
  }, {
    term: "raub",
    created_at: new Date().getUTCDate(),
  }, {
    term: "chałupa",
    created_at: new Date().getUTCDate(),
  }, {
    term: "dziywczym",
    created_at: new Date().getUTCDate(),
  }, {
    term: "chcym",
    created_at: new Date().getUTCDate(),
  }]);
}