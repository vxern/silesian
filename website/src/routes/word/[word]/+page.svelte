<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import SearchBar from "../../../components/search-bar/search-bar.svelte";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
</script>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <SearchBar />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <article class="flex gap-y-8 flex-col">
      {#each Array(20) as label}
        <article
          class="flex-1 flex flex-col items-start justify-start w-full text-start text-zinc-300"
        >
          <i class="text-blue-500">Zamianek</i>
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
                Używany do ôtwiyraniŏ zdań, co kōmunikujōm, iże jakŏś cecha abo
                zdarzynie sōm moc intynsywne.
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
          <br />
          <i class="text-blue-500">Spōjnik</i>
          <ol
            class="list-decimal list-inside w-full decoration-2 underline-offset-2"
          >
            <li>
              <span class="underline">używany do porōwnowaniŏ</span>
              <ul class="pl-8">
                <li>
                  „
                  <span class="italic text-zinc-400">
                    Kōnie sie uszamotały i jak norki spociły, ale wozu ani na
                    przodek nie giyny.
                  </span>
                  ”
                  <br />
                  <span>
                    1911, Paweł Marek, Ô czowieku, co bōł diŏbłōm przedany
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <span class="underline">
                używany do wrażaniŏ do zdaniŏ wyrażyń, co eklerujōm jego treść
              </span>
              <ul class="pl-8">
                <li>
                  „
                  <span class="italic text-zinc-400">
                    Chyciłbyś się harmoniki, nowo mosz, jak widza, no i
                    zagrołbyś coś szykownego...
                  </span>
                  ”
                  <br />
                  <span> 1957, Stanisław Ligoń, Bery i bojki śląskie </span>
                </li>
              </ul>
            </li>
            <li>
              <span class="underline">
                używany do stawianiŏ kole siebie rōwnych sobie partōw zdaniŏ
              </span>
              <ul class="pl-8">
                <li>
                  „
                  <span class="italic text-zinc-400">
                    Te młodzioki, tak dziołchy jak i synki, wolą oglądać teater
                    w telewizji niż sami zagrać.
                  </span>
                  ”
                  <br />
                  <span>
                    1978, Brunon Strzałka, Godek i Bojek Śląskich ciąg dalszy
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <span class="underline">
                używany do ôznaczyniŏ czasu czynności ôpisanyj we zdaniu głōwnym
              </span>
              <ul class="pl-8">
                <li>
                  „
                  <span class="italic text-zinc-400">
                    Jak mi było sześ lŏt, toch rŏz widzioł szumny ôbrŏzek we
                    ksiōnżce ô niyzbadanym lesie, co miała tytuł Historyje
                    Żywobyciŏ.
                  </span>
                  ”
                  <br />
                  <span>
                    2018, Antoine de Saint Exupéry, Mały Princ, przekł. Grzegorz
                    Kulik
                  </span>
                </li>
                <li>
                  „
                  <span class="italic text-zinc-400">
                    My sie ta nie bŏli, jak my mieli ze dwadzieścia lŏt abo ze
                    sztyry dwadzieścia.
                  </span>
                  ”
                  <br />
                  <span> 1964, Feliks Pluta, Dialekt głogówecki </span>
                </li>
              </ul>
            </li>
            <li>
              <span class="underline">używany przi porōwnaniach</span>
              <ul class="pl-8">
                <li>
                  „
                  <span class="italic text-zinc-400">
                    – Trocha meńszy jak ks. Prymas, ale trocha większy jak jo.
                  </span>
                  ”
                  <br />
                  <span> 1926, Gawędy Stacha Kropiciela, Gość Niedzielny </span>
                </li>
              </ul>
            </li>
            <li>
              <span class="underline">
                używany do ôtwiyraniŏ zdań podrzyndnych, co ôkryślajōm warōnek
                zajściŏ zdarzyniŏ ze głōwnego zdaniŏ
              </span>
              <ul class="pl-8">
                <li>
                  „
                  <span class="italic text-zinc-400">
                    Myśla se, iże trza iść do dochtora, bo jak mi dochtor
                    zapisze jakie kreple, to sie prędzej jako dzioucha ulituje.
                  </span>
                  ”
                  <br />
                  <span>1922, Kocynder</span>
                </li>
              </ul>
            </li>
          </ol>
          <br />
          <i class="text-green-500">Pochodzynie</i>
          <span>Zamianek i spōjnik ze prasłowiańskigo *jako.</span>
        </article>
        <article class="flex gap-x-1 items-center justify-end">
          {#each ["silling.org"] as label}
            <span class="text-zinc-600">{m["routes.word.source"]()}:</span>
            <span class="rounded-md text-blue-500 font-bold text-end">
              {label}
            </span>
          {/each}
        </article>
        <Page.Divider />
      {/each}
    </article>
  </Page.Contents>
</Page.Root>
