import lustre/element.{type Element}
import lustre/element/html

pub fn route() -> Element(msg) {
  html.h1([], [element.text("Homepage")])
}
