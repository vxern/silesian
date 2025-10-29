<script>
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";
  import SubdomainNavigationButton from "./subdomain-navigation-button.svelte";
  import Book2LineIcon from "~icons/mingcute/book-2-line";
  import Translate2LineIcon from "~icons/mingcute/translate-2-line";
  import FloatingDustLineIcon from "~icons/mingcute/floating-dust-line";
  import MapLineIcon from "~icons/mingcute/map-line";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import constants from "$lib/constants/core";

  let subdomain;
  if (page.url.hostname.includes(".")) {
    subdomain = page.url.hostname.split(".").at(0);
  } else {
    // TODO(vxern): This is only for testing.
    subdomain = "dictionary";
  }
</script>

<nav class="fixed top-8 flex gap-x-2">
  <SubdomainNavigationButton
    onclick={() => (window.location.href = constants.subdomains.dictionary)}
    highlighted={subdomain === "dictionary"}
  >
    <Book2LineIcon />
    <section class="relative">
      {m["routes.home.subdomains.dictionary"]()}
      <span class="absolute -bottom-3 right-0 text-xs font-bold text-green-500">
        {m["routes.home.version_label.beta"]()}
      </span>
    </section>
  </SubdomainNavigationButton>
  <article class="w-[1px] bg-zinc-700"></article>
  <SubdomainNavigationButton
    onclick={() => (window.location.href = constants.subdomains.translate)}
    highlighted={subdomain === "thesaurus"}
    supported={false}
  >
    <FloatingDustLineIcon />
    <section class="relative">
      {m["routes.home.subdomains.thesaurus"]()}
      <span class="absolute -bottom-3 right-0 text-xs font-bold">
        {m["routes.home.version_label.soon"]()}
      </span>
    </section>
  </SubdomainNavigationButton>
  <article class="w-[1px] bg-zinc-700"></article>
  <SubdomainNavigationButton
    onclick={() => (window.location.href = constants.subdomains.translate)}
    highlighted={subdomain === "translate"}
    supported={false}
  >
    <Translate2LineIcon />
    <section class="relative">
      {m["routes.home.subdomains.translations"]()}
      <span class="absolute -bottom-3 right-0 text-xs font-bold">
        {m["routes.home.version_label.soon"]()}
      </span>
    </section>
  </SubdomainNavigationButton>
  <article class="w-[1px] bg-zinc-700"></article>
  <SubdomainNavigationButton
    onclick={() => (window.location.href = constants.subdomains.map)}
    highlighted={subdomain === "map"}
    supported={false}
  >
    <MapLineIcon />
    <section class="relative">
      {m["routes.home.subdomains.map"]()}
      <span class="absolute -bottom-3 right-0 text-xs font-bold">
        {m["routes.home.version_label.soon"]()}
      </span>
    </section>
  </SubdomainNavigationButton>
  <article class="w-[1px] bg-zinc-700"></article>
  <SubdomainNavigationButton
    onclick={() => (window.location.href = constants.subdomains.guide)}
    highlighted={subdomain === "guide"}
    supported={false}
  >
    <Pencil2LineIcon />
    <section class="relative">
      {m["routes.home.subdomains.guide"]()}
      <span class="absolute -bottom-3 right-0 text-xs font-bold">
        {m["routes.home.version_label.soon"]()}
      </span>
    </section>
  </SubdomainNavigationButton>
</nav>
