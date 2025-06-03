<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";
  import NavigationButton from "./navigation-button.svelte";
  import Home2LineIcon from "~icons/mingcute/home-2-line";
  import Document2LineIcon from "~icons/mingcute/document-2-line";
  import Book6LineIcon from "~icons/mingcute/book-6-line";
  import InformationLineIcon from "~icons/mingcute/information-line";
  import AlignArrowRightLineIcon from "~icons/mingcute/align-arrow-right-line";
  import User1LineIcon from "~icons/mingcute/user-1-line";

  // TODO(vxern): This is a stub.
  let authenticated = true;
</script>

<nav class="fixed top-8 right-8 flex flex-col items-end gap-y-2">
  <NavigationButton
    onclick={() => goto("/")}
    highlighted={page.url.pathname === "/"}
  >
    {m["routes.home.title"]()}
    <Home2LineIcon />
  </NavigationButton>
  <!-- TODO(vxern): If there are results, show 'Słowo — słowo', otherwise show 'Wyszukanie — słowo' -->
  {#if page.url.pathname.startsWith("/word")}
    <NavigationButton highlighted={true}>
      {`${m["routes.word.title"]()} — ${decodeURIComponent(page.url.pathname.split("/word/").at(1))}`}
      <Document2LineIcon />
    </NavigationButton>
  {/if}
  <NavigationButton
    onclick={() => goto("/sources")}
    highlighted={page.url.pathname === "/sources"}
  >
    {m["routes.sources.title"]()}
    <Book6LineIcon />
  </NavigationButton>
  <NavigationButton
    onclick={() => goto("/about")}
    highlighted={page.url.pathname === "/about"}
  >
    {m["routes.about.title"]()}
    <InformationLineIcon />
  </NavigationButton>
  {#if !authenticated}
    <NavigationButton
      onclick={() => goto("/login")}
      highlighted={page.url.pathname === "/login"}
    >
      {m["routes.login.title"]()}
      <AlignArrowRightLineIcon />
    </NavigationButton>
  {:else}
    <NavigationButton
      onclick={() => goto("/account")}
      highlighted={page.url.pathname === "/account"}
    >
      {m["routes.account.title"]()}
      <User1LineIcon />
    </NavigationButton>
  {/if}
</nav>
