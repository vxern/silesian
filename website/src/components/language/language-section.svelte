<script>
  import { clsx } from "clsx/lite";
  import { m } from "$lib/paraglide/messages";
  import { locales } from "$lib/paraglide/runtime";
  import { getLocale, setLocale } from "$lib/paraglide/runtime";
  import GlobeLineIcon from "~icons/mingcute/globe-line";
  import DownLineIcon from "~icons/mingcute/down-line";
  import "flag-icons/css/flag-icons.min.css";

  // TODO(vxern): Trza to kaj indzij przeniyś.
  let isOpen = $state(false);

  // TODO(vxern): Moves this elsewhere?
  const localeToFlag = {
    szl: "szl",
    pl: "pl",
    cs: "cz",
    de: "de",
    "en-GB": "gb",
  };

  function toggleOpen() {
    isOpen = !isOpen;
  }

  function handleClick(event) {
    isOpen = false;
  }

  function getFlag(locale) {
    return localeToFlag[locale];
  }
</script>

<svelte:document onmouseup={handleClick} />

<nav class="fixed top-8 left-8 flex flex-row gap-x-2 text-xl">
  <span class="text-zinc-400">
    <GlobeLineIcon />
  </span>
  <section class="flex flex-col items-start gap-y-2">
    <button
      class={clsx(
        "flex items-center cursor-pointer",
        isOpen && "text-yellow-400 hover:text-yellow-300",
        !isOpen && "text-zinc-400 hover:text-zinc-300"
      )}
      onclick={() => toggleOpen()}
    >
      <section class="flex gap-x-2 items-center">
        <span class="fi fi-{getFlag(getLocale())} rounded-xs text-base"></span>
        {m[`languages.${getLocale()}`]()}
      </section>
      <DownLineIcon />
    </button>
    <section
      class={clsx(
        "p-2 flex flex-col gap-y-2 rounded-lg outline-1 outline-zinc-600 bg-zinc-800",
        isOpen ? "visible" : "invisible"
      )}
    >
      {#each locales as locale}
        <button
          class={clsx(
            "flex gap-x-2 items-center cursor-pointer",
            getLocale() == locale && "text-yellow-500 hover:text-yellow-400",
            getLocale() != locale && "text-zinc-400 hover:text-zinc-300"
          )}
          onclick={() => setLocale(locale)}
          onmouseup={null}
        >
          <span
            class="fi fi-{getFlag(
              locale
            )} rounded-xs text-base outline-1 outline-black"
          ></span>
          {m[`languages.${locale}`]()}
        </button>
      {/each}
    </section>
  </section>
</nav>
