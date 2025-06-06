<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";
  import NavigationButton from "./navigation-button.svelte";
  import Home2LineIcon from "~icons/mingcute/home-2-line";
  import Search2LineIcon from "~icons/mingcute/search-2-line";
  import Text2LineIcon from "~icons/mingcute/text-2-line";
  import Book6LineIcon from "~icons/mingcute/book-6-line";
  import InformationLineIcon from "~icons/mingcute/information-line";
  import AlignArrowRightLineIcon from "~icons/mingcute/align-arrow-right-line";
  import User2LineIcon from "~icons/mingcute/user-2-line";
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
  {#if page.url.pathname.startsWith("/word/")}
    <NavigationButton onclick={() => goto("/search")} highlighted={true}>
      {m["routes.word.title"]()}
      <Text2LineIcon />
    </NavigationButton>
  {:else}
    <NavigationButton
      onclick={() => goto("/search")}
      highlighted={page.url.pathname.startsWith("/search")}
    >
      {m["routes.search.title"]()}
      <Search2LineIcon />
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
  {#if !page.data.session}
    <NavigationButton
      onclick={() => goto("/signin")}
      highlighted={page.url.pathname === "/signin"}
    >
      {m["routes.signin.title"]()}
      <AlignArrowRightLineIcon />
    </NavigationButton>
  {:else}
    <NavigationButton
      onclick={() => goto("/account")}
      highlighted={page.url.pathname === "/account"}
    >
      {m["routes.account.title"]()}
      <User2LineIcon />
    </NavigationButton>
  {/if}
</nav>
