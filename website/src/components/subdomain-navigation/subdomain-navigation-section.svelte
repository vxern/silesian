<script>
  import { page } from "$app/state";
  import SubdomainNavigationButton from "./subdomain-navigation-button.svelte";
  import Book2LineIcon from "~icons/mingcute/book-2-line";
  import MapLineIcon from "~icons/mingcute/map-line";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import constants from "$lib/constants/core";

  let subdomain;
  if (page.url.hostname.includes(".")) {
    subdomain = page.url.hostname.split(".").at(0);
  } else {
    subdomain = "";
  }
</script>

<nav class="fixed top-8 flex flex-row items-end gap-x-2">
  <SubdomainNavigationButton
    onclick={() => (window.location.href = constants.subdomains.dictionary)}
    highlighted={subdomain === "dictionary"}
  >
    <Book2LineIcon />
  </SubdomainNavigationButton>
  <SubdomainNavigationButton
    onclick={() => (window.location.href = constants.subdomains.map)}
    highlighted={subdomain === "map"}
  >
    <MapLineIcon />
  </SubdomainNavigationButton>
  <SubdomainNavigationButton
    onclick={() => (window.location.href = constants.subdomains.writing)}
    highlighted={subdomain === "writing"}
  >
    <Pencil2LineIcon />
  </SubdomainNavigationButton>
</nav>
