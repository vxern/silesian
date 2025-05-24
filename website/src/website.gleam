import gleam/option
import gleam/result
import gleam/uri
import lustre
import lustre/effect
import lustre/element
import modem
import routes/dictionary
import routes/home

pub fn main() -> Nil {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}

type Route {
  Unknown
  Home
  Dictionary
}

fn init(_) -> #(Route, effect.Effect(Msg)) {
  let route =
    modem.initial_uri()
    |> result.map(fn(uri) { uri.path_segments(uri.path) })
    |> fn(path) {
      case path {
        Ok(["dictionary"]) -> Dictionary
        Ok(["/"]) -> Home
        _ -> Unknown
      }
    }

  #(
    route,
    effect.batch([
      modem.init(on_url_change),
      case route {
        Unknown -> modem.replace("/", option.None, option.None)
        _ -> effect.none()
      },
    ]),
  )
}

fn on_url_change(uri: uri.Uri) -> Msg {
  case uri.path_segments(uri.path) {
    ["dictionary"] -> UserChangedRoute(Dictionary)
    _ -> UserChangedRoute(Home)
  }
}

type Msg {
  UserChangedRoute(Route)
}

fn update(_, msg: Msg) -> #(Route, effect.Effect(Msg)) {
  case msg {
    UserChangedRoute(route) -> #(route, effect.none())
  }
}

fn view(route: Route) -> element.Element(Msg) {
  case route {
    Dictionary -> dictionary.route()
    _ -> home.route()
  }
}
