<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
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
      <section class="flex flex-col gap-y-1 items-start">
        <label for="word" class="pl-1 text-xl text-blue-500">
          {m["routes.editor.new.form.lemma"]()}
        </label>
        <section class="flex gap-x-4 w-full">
          <input
            type="text"
            id="word"
            placeholder={m["routes.editor.new.form.lemma_placeholder"]()}
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-600 p-3 rounded-lg"
            value="jak"
          />
          <section class="flex-1 p-3"></section>
        </section>
      </section>
      <section class="flex flex-col gap-y-1 items-start">
        <label for="word" class="pl-1 text-xl text-blue-500">
          {m["routes.editor.new.form.contents"]()}
        </label>
        <section class="flex gap-x-4 w-full">
          <textarea
            type="text"
            id="contents"
            rows="20"
            placeholder={m["routes.editor.new.form.contents_placeholder"]()}
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-600 p-3 rounded-lg font-mono"
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
            class="flex-1 outline-1 outline-zinc-600 p-3 rounded-lg text-start"
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
    </form>
  </Page.Contents>
</Page.Root>
