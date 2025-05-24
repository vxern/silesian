import gleam/list
import gleam/result
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

const subtitles = [
  "Dykcjōnŏrze ślōnskij gŏdki", "Dykcjōnŏrze ślōnskigo jynzyka",
  "Dykcjōnŏrze ślōnskij mŏwy", "Dykcjōnŏrze ślōnskij szprachy",
  "Dykcjōnŏrze ślōnskij rzeczy", "Dykcjōnŏrze ślōnskigo narzeczŏ",
  "Dykcjōnŏrze pō naszymu",
]

pub fn route() -> Element(msg) {
  html.section(
    [
      attribute.class(
        "min-h-screen min-w-screen flex bg-zinc-900 items-center text-center",
      ),
    ],
    [
      html.article([attribute.class("flex-1")], [
        html.h1([attribute.class("text-7xl font-bold text-yellow-400")], [
          element.text("silesian.eu"),
        ]),
        html.h1([attribute.class("text-2xl text-blue-500")], [
          element.text(
            subtitles
            |> list.sample(1)
            |> list.first
            |> result.unwrap("Dykcjōnŏrze ślōnskij gŏdki"),
          ),
        ]),
      ]),
    ],
  )
}
