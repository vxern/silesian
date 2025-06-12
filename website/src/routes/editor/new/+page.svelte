<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import constants from "$lib/constants/core";

  // TODO(vxern): Pick the example at random from the database.
  // TOOD(vxern): Extract the defaults into the constants.
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.editor.new.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.editor.new.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.editor.new.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <form method="POST" action="?/create" class="flex flex-col gap-y-6">
      <section class="flex gap-x-4">
        <section class="flex-1 flex flex-col gap-y-1 items-start">
          <label for="word" class="pl-1 text-xl text-blue-500">
            {m["routes.editor.new.form.lemma"]()}
          </label>
          <input
            type="text"
            name="word"
            placeholder={m["routes.editor.new.form.lemma_placeholder"]()}
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-3 w-full rounded-lg"
            value="jak"
          />
        </section>
        <section class="flex-1 flex flex-col gap-y-1 items-start">
          <label for="word" class="pl-1 text-xl text-blue-500">
            {m["routes.editor.new.form.source"]()}
          </label>
          <input
            type="text"
            name="source"
            placeholder={m["routes.editor.new.form.source_placeholder"]()}
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-3 w-full rounded-lg"
            value="kulik/słownik"
          />
        </section>
      </section>
      <section class="flex flex-col gap-y-1 items-start">
        <label for="word" class="pl-1 text-xl text-blue-500">
          {m["routes.editor.new.form.contents"]()}
        </label>
        <section class="flex flex-col gap-y-4 w-full">
          <textarea
            type="text"
            name="contents"
            placeholder={m["routes.editor.new.form.contents_placeholder"]()}
            rows="16"
            class="bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-3 rounded-lg text-sm font-mono h-96"
            >{`## Przimiotnik

1. Używany do pytaniŏ ô sztand abo spusōb.
  > Jak widzicie niydŏwny welōnek w Katalōniji, tyn po zdymisjōnowaniu waszego regiyrōnku?
  > 2018, Wachtyrz
2. Używany do ôtwiyraniŏ zdań, co kōmunikujōm, iże jakŏś cecha abo zdarzynie sōm moc intynsywne.
  > Jak sam capi, niy ma blank czym łoddychać...
  > ojgyn.blogspot.com
3. Używany do ôtwarciŏ zdaniŏ zależnego, co mŏ naturã pytaniŏ.
  > Już mioł pełny garniec i niy wiedzioł, jak zastawić.
  > 1939, Stanisław Bąk, Teksty gwarowe z polskiego Śląska
4. Używany do postawiyniŏ warōnku.
  > Jak niy bydzie mōgła, bydã żōł ś niōm sōm.
  > 2016, Robert Burns, Remember Tam O'Shanter's Mare, przekł. Mirosław Syniawa`}
          </textarea>
          <section
            class="bg-blue-950 outline-1 outline-blue-700 p-3 rounded-lg text-start h-96"
          >
            <i class="text-blue-500">Przimiotnik</i>
            <ol
              class="list-decimal list-inside w-full decoration-2 underline-offset-2"
            >
              <li>
                <span class="underline">
                  Używany do pytaniŏ ô sztand abo spusōb.
                </span>
                <ul class="pl-8">
                  <li>
                    „
                    <span class="italic text-zinc-400">
                      Jak widzicie niydŏwny welōnek w Katalōniji, tyn po
                      zdymisjōnowaniu waszego regiyrōnku?
                    </span>
                    ”
                    <br />
                    <span>2018, Wachtyrz</span>
                  </li>
                </ul>
              </li>
              <li>
                <span class="underline">
                  Używany do ôtwiyraniŏ zdań, co kōmunikujōm, iże jakŏś cecha
                  abo zdarzynie sōm moc intynsywne.
                </span>
                <ul class="pl-8">
                  <li>
                    „
                    <span class="italic text-zinc-400">
                      Jak sam capi, niy ma blank czym łoddychać...
                    </span>
                    ”
                    <br />
                    <span>ojgyn.blogspot.com</span>
                  </li>
                </ul>
              </li>
              <li>
                <span class="underline">
                  Używany do ôtwarciŏ zdaniŏ zależnego, co mŏ naturã pytaniŏ.
                </span>
                <ul class="pl-8">
                  <li>
                    „
                    <span class="italic text-zinc-400">
                      Już mioł pełny garniec i niy wiedzioł, jak zastawić.
                    </span>
                    ”
                    <br />
                    <span
                      >1939, Stanisław Bąk, Teksty gwarowe z polskiego Śląska</span
                    >
                  </li>
                </ul>
              </li>
              <li>
                <span class="underline"> Używany do postawiyniŏ warōnku. </span>
                <ul class="pl-8">
                  <li>
                    „
                    <span class="italic text-zinc-400">
                      Jak niy bydzie mōgła, bydã żōł ś niōm sōm.
                    </span>
                    ”
                    <br />
                    <span>
                      2016, Robert Burns, Remember Tam O'Shanter's Mare, przekł.
                      Mirosław Syniawa
                    </span>
                  </li>
                </ul>
              </li>
            </ol>
          </section>
        </section>
      </section>
      <section class="flex gap-x-4 items-start">
        <button
          type="submit"
          class="cursor-pointer flex items-center gap-x-1 outline-1 outline-green-500 bg-green-700 hover:bg-green-600 text-green-200 hover:text-green-100 rounded-lg text-lg font-bold p-2"
        >
          <AddLineIcon />
          {m["routes.editor.new.form.submit"]()}
        </button>
      </section>
    </form>
  </Page.Contents>
</Page.Root>
